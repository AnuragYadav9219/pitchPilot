package com.virtualmentor.subscription.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.config.configurations.PlanEntitlementConfig;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.exception.SubscriptionRequiredException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EntitlementServiceImpl implements EntitlementService {

    private final SubscriptionService subscriptionService;
    private final PlanEntitlementConfig planEntitlementConfig;

    @Override
    @Transactional(readOnly = true)
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
    @Transactional(readOnly = true)
    public Set<Entitlement> getEntitlements(UUID userId) {

        SubscriptionPlan effectivePlan = subscriptionService.getEffectivePlan(userId);

        return planEntitlementConfig.getEntitlements(effectivePlan);
    }

}
