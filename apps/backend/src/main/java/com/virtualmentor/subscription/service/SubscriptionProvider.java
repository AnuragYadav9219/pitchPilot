package com.virtualmentor.subscription.service;

import java.time.Instant;

import com.virtualmentor.subscription.entity.BillingProvider;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;

public interface SubscriptionProvider {

    BillingProvider getProvider();

    SubscriptionInfo getSubscription(String customerId);

    record SubscriptionInfo(

            String customerId,
            String subscriptionId,
            String productId,
            SubscriptionPlan plan,
            SubscriptionStatus status,
            boolean autoRenew,
            Instant startedAt,
            Instant expiresAt,
            String environment) {

    }
}
