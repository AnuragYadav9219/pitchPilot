package com.virtualmento.otp.repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpCode;
import com.virtualmento.otp.entity.OtpPurpose;

public interface OtpCodeRepository
                extends JpaRepository<OtpCode, UUID> {

        Optional<OtpCode> findTopByUserIdAndPurposeAndChannelAndTargetAndUsedAtIsNullOrderByCreatedAtDesc(
                        UUID userId,
                        OtpPurpose purpose,
                        OtpChannel channel,
                        String target);

        @Modifying
        @Query("""
                        UPDATE OtpCode o
                        SET o.usedAt = :now
                        WHERE o.user.id = :userId
                          AND o.purpose = :purpose
                          AND o.channel = :channel
                          AND o.target = :target
                          AND o.usedAt IS NULL
                        """)
        int invalidateActiveOtps(
                        @Param("userId") UUID userId,
                        @Param("purpose") OtpPurpose purpose,
                        @Param("channel") OtpChannel channel,
                        @Param("target") String target,
                        @Param("now") Instant now);

        @Modifying
        @Query("""
                        DELETE FROM OtpCode o
                        WHERE o.expiresAt < :now
                        """)
        int deleteExpiredOtps(
                        @Param("now") Instant now);
}