package com.virtualmentor.subscription.service;

import java.util.UUID;

import com.virtualmentor.subscription.entity.SubscriptionLimit;

public interface SubscriptionLimitService {

    boolean canUse(
            UUID userId,
            SubscriptionLimit limit);

    void consume(
            UUID userId,
            SubscriptionLimit limit);

    int getLimit(
            UUID userId,
            SubscriptionLimit limit);

    int getUsed(
            UUID userId,
            SubscriptionLimit limit);
}