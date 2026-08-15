package com.virtualmento.otp.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.TokenHasher;
import com.virtualmento.config.properties.OtpProperties;
import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpCode;
import com.virtualmento.otp.entity.OtpPurpose;
import com.virtualmento.otp.exception.InvalidOtpException;
import com.virtualmento.otp.exception.OtpExpiredException;
import com.virtualmento.otp.exception.OtpLockedException;
import com.virtualmento.otp.exception.OtpRateLimitException;
import com.virtualmento.otp.model.OtpDestination;
import com.virtualmento.otp.model.OtpMessage;
import com.virtualmento.otp.repository.OtpCodeRepository;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

        private final OtpDeliveryService otpDeliveryService;
        private final OtpCodeRepository otpRepository;
        private final UserRepository userRepository;
        private final OtpCodeGenerator otpCodeGenerator;
        private final TokenHasher tokenHasher;
        private final OtpProperties otpProperties;
        private final OtpMessageFactory otpMessageFactory;
        private final OtpDestinationResolver otpDestinationResolver;

        // =========================================================
        // SEND OTP
        // =========================================================

        @Override
        @Transactional
        public void send(
                        User user,
                        OtpPurpose purpose,
                        OtpChannel channel) {

                OtpDestination destination = otpDestinationResolver.resolve(
                                user,
                                purpose,
                                channel);

                String target = normalizeTarget(
                                destination.target(),
                                channel);

                Instant now = Instant.now();

                otpRepository
                                .findTopByUserIdAndPurposeAndChannelAndTargetAndUsedAtIsNullOrderByCreatedAtDesc(
                                                user.getId(),
                                                purpose,
                                                channel,
                                                target)
                                .ifPresent(existing -> {

                                        Instant cooldownUntil = existing.getCreatedAt()
                                                        .plus(
                                                                        otpProperties
                                                                                        .resendCooldownSeconds(),
                                                                        ChronoUnit.SECONDS);

                                        if (now.isBefore(
                                                        cooldownUntil)) {

                                                throw new OtpRateLimitException();
                                        }
                                });

                otpRepository.invalidateActiveOtps(
                                user.getId(),
                                purpose,
                                channel,
                                target,
                                now);

                String rawOtp = otpCodeGenerator.generate();

                String otpHash = tokenHasher.hash(rawOtp);

                Instant expiresAt = now.plus(
                                otpProperties
                                                .expirationSeconds(),
                                ChronoUnit.SECONDS);

                OtpCode otpCode = OtpCode.builder()
                                .codeHash(otpHash)
                                .user(user)
                                .purpose(purpose)
                                .channel(channel)
                                .target(target)
                                .expiresAt(expiresAt)
                                .attempts(0)
                                .maxAttempts(
                                                otpProperties
                                                                .maxAttempts())
                                .createdAt(now)
                                .build();

                otpRepository.save(otpCode);

                OtpMessage message = otpMessageFactory.create(
                                user,
                                purpose,
                                channel,
                                target,
                                rawOtp);

                otpDeliveryService.send(message);
        }

        // =========================================================
        // VERIFY OTP
        // =========================================================

        @Override
        @Transactional
        public void verify(
                        User user,
                        OtpPurpose purpose,
                        OtpChannel channel,
                        String otp) {

                if (otp == null ||
                                !otp.matches("\\d{6}")) {

                        throw new InvalidOtpException();
                }

                OtpDestination destination = otpDestinationResolver.resolve(
                                user,
                                purpose,
                                channel);

                String target = normalizeTarget(
                                destination.target(),
                                channel);

                OtpCode otpCode = otpRepository
                                .findTopByUserIdAndPurposeAndChannelAndTargetAndUsedAtIsNullOrderByCreatedAtDesc(
                                                user.getId(),
                                                purpose,
                                                channel,
                                                target)
                                .orElseThrow(
                                                InvalidOtpException::new);

                Instant now = Instant.now();

                if (otpCode.getExpiresAt().isBefore(now)) {

                        throw new OtpExpiredException();
                }

                if (otpCode.getAttempts() >= otpCode.getMaxAttempts()) {

                        throw new OtpLockedException();
                }

                otpCode.setLastAttemptAt(now);

                otpCode.setAttempts(otpCode.getAttempts() + 1);

                String suppliedHash = tokenHasher.hash(otp);

                if (!suppliedHash.equals(otpCode.getCodeHash())) {

                        if (otpCode.getAttempts() >= otpCode.getMaxAttempts()) {

                                throw new OtpLockedException();
                        }

                        throw new InvalidOtpException();
                }

                // OTP IS VALID
                otpCode.setUsedAt(now);

                if (purpose == OtpPurpose.EMAIL_VERIFICATION && channel == OtpChannel.EMAIL) {

                        user.setEmailVerified(true);

                        userRepository.save(user);
                }
        }

        // =========================================================
        // TARGET NORMALIZATION
        // =========================================================

        private String normalizeTarget(
                        String target,
                        OtpChannel channel) {

                if (target == null ||
                                target.isBlank()) {

                        throw new IllegalArgumentException(
                                        "OTP target is required");
                }

                String normalized = target.trim();

                if (channel == OtpChannel.EMAIL) {
                        return normalized.toLowerCase();
                }

                return normalized;
        }
}