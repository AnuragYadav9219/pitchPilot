package com.virtualmentor.auth.verification;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.common.security.SecureTokenGenerator;
import com.virtualmentor.common.security.TokenHasher;
import com.virtualmentor.config.EmailVerificationProperties;
import com.virtualmentor.config.properties.AppProperties;
import com.virtualmentor.notification.email.EmailSender;
import com.virtualmentor.notification.exception.InvalidEmailVerificationTokenException;
import com.virtualmentor.token.entity.EmailVerificationToken;
import com.virtualmentor.token.repository.EmailVerificationTokenRepository;
import com.virtualmentor.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

        private final EmailVerificationTokenRepository tokenRepository;
        private final SecureTokenGenerator tokenGenerator;
        private final TokenHasher tokenHasher;
        private final EmailSender emailSender;
        private final EmailVerificationProperties properties;
        private final AppProperties appProperties;

        // =========================================================
        // SEND VERIFICATION
        // =========================================================

        @Transactional
        public void sendVerificationEmail(
                        User user) {

                if (Boolean.TRUE.equals(user.getEmailVerified())) {
                        return;
                }

                /*
                 * Only one active verification token
                 * should exist for a user.
                 */
                tokenRepository.invalidateActiveTokens(
                                user.getId(),
                                Instant.now());

                String rawToken = tokenGenerator.generate();

                String tokenHash = tokenHasher.hash(rawToken);

                Instant expiresAt = Instant.now()
                                .plus(
                                                properties.expirationSeconds(),
                                                ChronoUnit.SECONDS);

                EmailVerificationToken entity = EmailVerificationToken.builder()
                                .tokenHash(tokenHash)
                                .user(user)
                                .expiresAt(expiresAt)
                                .build();

                tokenRepository.save(entity);

                String verificationUrl = buildVerificationUrl(
                                rawToken);

                emailSender.send(
                                user.getEmail(),
                                "Verify your VirtualMentor email",
                                buildEmailContent(
                                                user.getFullName(),
                                                verificationUrl));
        }

        // =========================================================
        // VERIFY
        // =========================================================

        @Transactional
        public void verify(
                        String rawToken) {

                if (rawToken == null ||
                                rawToken.isBlank()) {

                        throw new InvalidEmailVerificationTokenException();
                }

                String tokenHash = tokenHasher.hash(rawToken);

                EmailVerificationToken token = tokenRepository
                                .findByTokenHash(tokenHash)
                                .orElseThrow(
                                                InvalidEmailVerificationTokenException::new);

                Instant now = Instant.now();

                if (token.getUsedAt() != null) {

                        throw new InvalidEmailVerificationTokenException();
                }

                if (token.getExpiresAt().isBefore(now)) {

                        throw new InvalidEmailVerificationTokenException();
                }

                User user = token.getUser();

                token.setUsedAt(now);

                if (Boolean.TRUE.equals(
                                user.getEmailVerified())) {
                        return;
                }

                user.setEmailVerified(true);
        }

        // =========================================================
        // RESEND
        // =========================================================

        @Transactional
        public void resendVerificationEmail(User user) {

                sendVerificationEmail(user);
        }

        // =========================================================
        // URL
        // =========================================================

        private String buildVerificationUrl(
                        String rawToken) {

                return appProperties.frontendUrl()
                                + "/verify-email?token="
                                + rawToken;
        }

        // =========================================================
        // EMAIL
        // =========================================================

        private String buildEmailContent(
                        String fullName,
                        String verificationUrl) {

                return """
                                Hello %s,

                                Welcome to VirtualMentor!

                                Please verify your email address by
                                clicking the link below:

                                %s

                                This link will expire in %d minutes.

                                If you did not create this account,
                                you can safely ignore this email.

                                Regards,
                                VirtualMentor Team
                                """
                                .formatted(
                                                fullName,
                                                verificationUrl,
                                                properties.expirationSeconds() / 60);
        }
}