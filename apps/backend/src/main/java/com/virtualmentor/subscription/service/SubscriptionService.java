package com.virtualmentor.subscription.service;

import java.util.UUID;

import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;

public interface SubscriptionService {

    Subscription getOrCreate(UUID userId);

    Subscription createFreeSubscription(UUID userId);

    Subscription sync(UUID userId);

    Subscription getCurrentSubscription(UUID userId);

    SubscriptionPlan getEffectivePlan(UUID userId);
}
