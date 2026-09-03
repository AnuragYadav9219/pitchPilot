package com.virtualmentor.subscription.dto;

import java.time.Instant;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;

public record SubscriptionResponse(

        UUID id,

        SubscriptionPlan plan,

        SubscriptionStatus status,

        Set<Entitlement> entitlements,

        Instant startedAt,

        Instant expiresAt,

        boolean autoRenew,
        
        Map<SubscriptionLimit, SubscriptionLimitResponse> limits) {

}
