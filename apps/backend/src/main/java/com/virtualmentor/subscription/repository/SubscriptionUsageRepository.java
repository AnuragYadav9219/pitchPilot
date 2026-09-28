package com.virtualmentor.subscription.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionUsage;

import jakarta.persistence.LockModeType;

public interface SubscriptionUsageRepository extends JpaRepository<SubscriptionUsage, UUID> {

    Optional<SubscriptionUsage> findByUserIdAndLimitTypeAndUsageMonth(
            UUID userId,
            SubscriptionLimit limitType,
            String usageMonth);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
                SELECT u
                FROM SubscriptionUsage u
                WHERE u.userId = :userId
                  AND u.limitType = :limitType
                  AND u.usageMonth = :usageMonth
            """)
    Optional<SubscriptionUsage> findForUpdate(
            @Param("userId") UUID userId,
            @Param("limitType") SubscriptionLimit limitType,
            @Param("usageMonth") String usageMonth);
}