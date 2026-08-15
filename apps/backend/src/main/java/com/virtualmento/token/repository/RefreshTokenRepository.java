package com.virtualmento.token.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.token.entity.RefreshToken;

public interface RefreshTokenRepository
                extends JpaRepository<RefreshToken, UUID> {

        Optional<RefreshToken> findByTokenHash(String tokenHash);

        List<RefreshToken> findByUserIdAndRevokedAtIsNullOrderByLastUsedAtDesc(UUID userId);

        @Modifying
        @Query("""
                        UPDATE RefreshToken r
                        SET r.revokedAt = :revokedAt
                        WHERE r.id = :tokenId
                        AND r.revokedAt IS NULL
                        """)
        int revokeIfActive(
                        @Param("tokenId") UUID tokenId,
                        @Param("revokedAt") Instant revokedAt);

        @Modifying
        @Query("""
                        UPDATE RefreshToken r
                        SET r.revokedAt = :revokedAt
                        WHERE r.user.id = :userId
                        AND r.revokedAt IS NULL
                        """)
        int revokeAllByUserId(
                        @Param("userId") UUID userId,
                        @Param("revokedAt") Instant revokedAt);

        @Modifying
        @Query("""
                        UPDATE RefreshToken r
                        SET r.revokedAt = :revokedAt
                        Where r.user.id = :userId
                        AND r.id <> :currentTokenId
                        AND r.revokedAt IS NULL
                        """)
        int revokeAllExceptCurrent(
                        @Param("userId") UUID userId,
                        @Param("currentTokenId") UUID currentTokenId,
                        @Param("revokedAt") Instant revokedAt);

        @Modifying
        @Query("""
                        UPDATE RefreshToken r
                        SET r.revokedAt = :revokedAt
                        WHERE r.id = :tokenId
                        AND r.user.id = :userId
                        AND r.revokedAt IS NULL
                        """)
        int revokeUserSession(
                        @Param("tokenId") UUID tokenId,
                        @Param("userId") UUID userId,
                        @Param("revokedAt") Instant revokedAt);

        @Modifying
        @Query("""
                        DELETE FROM RefreshToken r
                        WHERE r.expiresAt < :now
                        """)
        int deleteExpiredTokens(@Param("now") Instant now);
}