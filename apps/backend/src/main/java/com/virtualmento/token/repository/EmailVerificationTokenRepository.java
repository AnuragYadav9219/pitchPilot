package com.virtualmento.token.repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.token.entity.EmailVerificationToken;

public interface EmailVerificationTokenRepository
        extends JpaRepository<EmailVerificationToken, UUID> {

    Optional<EmailVerificationToken> findByTokenHash(
            String tokenHash
    );

    @Modifying
    @Query("""
            UPDATE EmailVerificationToken t
            SET t.usedAt = :usedAt
            WHERE t.user.id = :userId
            AND t.usedAt IS NULL
            """)
    int invalidateActiveTokens(
            @Param("userId") UUID userId,
            @Param("usedAt") Instant usedAt
    );

    @Modifying
    @Query("""
            DELETE FROM EmailVerificationToken t
            WHERE t.expiresAt < :now
            """)
    int deleteExpiredTokens(
            @Param("now") Instant now
    );
}