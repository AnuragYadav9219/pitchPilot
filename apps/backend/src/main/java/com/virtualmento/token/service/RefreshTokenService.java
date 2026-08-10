package com.virtualmento.token.service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.TokenHasher;
import com.virtualmento.token.dto.SessionResponse;
import com.virtualmento.token.entity.RefreshToken;
import com.virtualmento.token.exception.InvalidRefreshTokenException;
import com.virtualmento.token.repository.RefreshTokenRepository;
import com.virtualmento.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

        private static final int TOKEN_BYTES = 64;
        private static final long REFRESH_TOKEN_DAYS = 30;

        private final RefreshTokenRepository refreshTokenRepository;
        private final TokenHasher tokenHasher;

        private final SecureRandom secureRandom = new SecureRandom();

        // =========================================================
        // CREATE
        // =========================================================

        @Transactional
        public GeneratedRefreshToken create(
                        User user,
                        String deviceName,
                        String userAgent,
                        String ipAddress) {

                byte[] randomBytes = new byte[TOKEN_BYTES];

                secureRandom.nextBytes(randomBytes);

                String rawToken = Base64.getUrlEncoder()
                                .withoutPadding()
                                .encodeToString(randomBytes);

                String tokenHash = tokenHasher.hash(rawToken);

                Instant expiresAt = Instant.now()
                                .plus(
                                                REFRESH_TOKEN_DAYS,
                                                ChronoUnit.DAYS);

                RefreshToken refreshToken = RefreshToken.builder()
                                .tokenHash(tokenHash)
                                .user(user)
                                .expiresAt(expiresAt)
                                .build();

                refreshTokenRepository.save(refreshToken);

                return new GeneratedRefreshToken(
                                rawToken,
                                expiresAt,
                                refreshToken.getId());
        }

        // =========================================================
        // ROTATE
        // =========================================================

        @Transactional
        public RotatedRefreshToken rotate(String rawToken) {

                if (rawToken == null || rawToken.isBlank()) {
                        throw new InvalidRefreshTokenException();
                }

                String tokenHash = tokenHasher.hash(rawToken);

                RefreshToken existing = refreshTokenRepository
                                .findByTokenHash(tokenHash)
                                .orElseThrow(
                                                InvalidRefreshTokenException::new);

                Instant now = Instant.now();

                // Already revoked
                if (existing.getRevokedAt() != null) {
                        throw new InvalidRefreshTokenException();
                }

                // Expired
                if (existing.getExpiresAt().isBefore(now)) {
                        throw new InvalidRefreshTokenException();
                }

                User user = existing.getUser();

                // Disabled account
                if (!Boolean.TRUE.equals(user.getEnabled())) {
                        throw new InvalidRefreshTokenException();
                }

                int revoked = refreshTokenRepository.revokeIfActive(
                                existing.getId(),
                                now);

                if (revoked != 1) {
                        throw new InvalidRefreshTokenException();
                }

                GeneratedRefreshToken generated = create(
                                user,
                                existing.getDeviceName(),
                                existing.getUserAgent(),
                                existing.getIpAddress());

                return new RotatedRefreshToken(
                                generated.token(),
                                generated.expiresAt(),
                                generated.id(),
                                user);
        }

        // =========================================================
        // LOGOUT CURRENT DEVICE
        // =========================================================

        @Transactional
        public void revoke(String rawToken) {

                if (rawToken == null || rawToken.isBlank()) {
                        return;
                }

                String tokenHash = tokenHasher.hash(rawToken);

                refreshTokenRepository
                                .findByTokenHash(tokenHash)
                                .ifPresent(token -> refreshTokenRepository.revokeIfActive(
                                                token.getId(),
                                                Instant.now()));
        }

        // =========================================================
        // LOGOUT ALL DEVICES
        // =========================================================

        @Transactional
        public int revokeAllByUserId(UUID userId) {

                return refreshTokenRepository.revokeAllByUserId(
                                userId,
                                Instant.now());
        }

        // =========================================================
        // LOGOUT OTHER DEVICES
        // =========================================================

        @Transactional
        public int revokedAllExceptCurrent(
                        String currentRefreshToken) {

                if (currentRefreshToken == null || currentRefreshToken.isBlank()) {
                        throw new InvalidRefreshTokenException();
                }

                String tokenHash = tokenHasher.hash(currentRefreshToken);

                RefreshToken currentToken = refreshTokenRepository
                                .findByTokenHash(tokenHash)
                                .orElseThrow(InvalidRefreshTokenException::new);

                Instant now = Instant.now();

                if (currentToken.getRevokedAt() != null) {
                        throw new InvalidRefreshTokenException();
                }

                if (currentToken.getExpiresAt().isBefore(now)) {
                        throw new InvalidRefreshTokenException();
                }

                User user = currentToken.getUser();

                if (!Boolean.TRUE.equals(user.getEnabled())) {
                        throw new InvalidRefreshTokenException();
                }

                return refreshTokenRepository.revokeAllExceptCurrent(
                                user.getId(),
                                currentToken.getId(),
                                now);
        }

        // =========================================================
        // GET ACTIVE SESSIONS
        // =========================================================

        @Transactional(readOnly = true)
        public List<SessionResponse> getActiveSessions(
                        UUID userId,
                        UUID currentSessionId) {

                return refreshTokenRepository
                                .finByUserIdAndRevokedAtIsNullOrderByLastUsedAtDesc(userId)
                                .stream()
                                .map(token -> new SessionResponse(
                                                token.getId(),
                                                token.getDeviceName(),
                                                token.getUserAgent(),
                                                token.getIpAddress(),
                                                token.getCreatedAt(),
                                                token.getLastUsedAt(),
                                                token.getExpiresAt(),
                                                token.getId().equals(currentSessionId)))
                                .toList();
        }

        // =========================================================
        // REVOKE SPECIFIC SESSION
        // =========================================================

        @Transactional
        public void revokeSession(
                        UUID userId,
                        UUID sessionId) {

                int revoked = refreshTokenRepository
                                .revokeUserSession(
                                                sessionId,
                                                userId,
                                                Instant.now());

                if (revoked != 1) {

                        throw new InvalidRefreshTokenException();
                }
        }

        @Transactional
        public int deleteExpiredTokens() {

                return refreshTokenRepository.deleteExpiredTokens(
                                Instant.now());
        }

        public record GeneratedRefreshToken(
                        String token,
                        Instant expiresAt,
                        UUID id) {
        }

        public record RotatedRefreshToken(
                        String token,
                        Instant expiresAt,
                        UUID id,
                        User user) {
        }
}