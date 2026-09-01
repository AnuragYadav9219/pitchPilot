package com.virtualmentor.subscription.service;

import java.util.UUID;

import com.virtualmentor.subscription.entity.Subscription;

public interface SubscriptionService {

    Subscription getOrCreate(UUID userId);

    Subscription createFreeSubscription(UUID userId);

    Subscription sync(UUID userId);
}
