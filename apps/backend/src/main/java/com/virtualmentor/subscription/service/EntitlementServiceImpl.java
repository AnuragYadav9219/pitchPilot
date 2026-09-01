package com.virtualmentor.subscription.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.virtualmentor.config.PlanEntitlementConfig;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.exception.SubscriptionRequiredException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EntitlementServiceImpl implements EntitlementService {

    private final SubscriptionService subscriptionService;
    private final PlanEntitlementConfig planEntitlementConfig;

    @Override
    public boolean hasEntitlement(UUID userId, Entitlement entitlement) {

        return getEntitlements(userId)
                .contains(entitlement);
    }

    @Override
    public void require(UUID userId, Entitlement entitlement) {

        if (!hasEntitlement(userId, entitlement)) {

            throw new SubscriptionRequiredException(
                    "Subscription required for " + entitlement);
        }
    }

    @Override
    public Set<Entitlement> getEntitlements(UUID userId) {

        Subscription subscription = subscriptionService.getOrCreate(userId);

        if (subscription.getPlan() != SubscriptionPlan.FREE
                && subscription.getStatus() != SubscriptionStatus.ACTIVE) {
                    
            return planEntitlementConfig.getEntitlements(SubscriptionPlan.FREE);
        }

        return planEntitlementConfig
                .getEntitlements(subscription.getPlan());
    }

}
