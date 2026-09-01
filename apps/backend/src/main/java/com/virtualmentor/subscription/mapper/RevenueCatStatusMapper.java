package com.virtualmentor.subscription.mapper;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.SubscriptionStatus;

@Component
public class RevenueCatStatusMapper {

    public SubscriptionStatus toStatus(String status) {

        if (status == null) {
            return SubscriptionStatus.INACTIVE;
        }

        return switch (status) {

            case "active", "trialing" ->
                SubscriptionStatus.ACTIVE;

            case "in_grace_period" ->
                SubscriptionStatus.GRACE_PERIOD;

            case "in_billing_retry" ->
                SubscriptionStatus.BILLING_RETRY;

            case "expired", "paused" ->
                SubscriptionStatus.EXPIRED;

            default -> SubscriptionStatus.INACTIVE;
        };
    }
}
