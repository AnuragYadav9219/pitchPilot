package com.virtualmento.scheduler;

import java.time.Instant;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.otp.repository.OtpCodeRepository;
import com.virtualmento.token.repository.EmailVerificationTokenRepository;
import com.virtualmento.token.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OtpCleanupScheduler {

    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;
    private final OtpCodeRepository otpCodeRepository;

    @Scheduled(fixedDelayString = "${security.token.cleanup-delay-ms:3600000}")
    @Transactional
    public void cleanup() {
        Instant now = Instant.now();

        refreshTokenRepository.deleteExpiredTokens(now);

        emailVerificationTokenRepository.deleteExpiredTokens(now);

        otpCodeRepository.deleteExpiredOtps(now);
    }
}
