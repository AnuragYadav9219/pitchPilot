package com.virtualmentor.subscription.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionUsage;

public interface SubscriptionUsageRepository extends JpaRepository<SubscriptionUsage, UUID> {

    Optional<SubscriptionUsage> findByUserIdAndLimitTypeAndUsageMonth(
            UUID userId,
            SubscriptionLimit limitType,
            String usageMonth);
}