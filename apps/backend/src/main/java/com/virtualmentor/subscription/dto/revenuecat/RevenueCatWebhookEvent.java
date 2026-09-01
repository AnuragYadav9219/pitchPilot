package com.virtualmentor.subscription.dto.revenuecat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatWebhookEvent(

        String id,

        String type,

        @JsonProperty("app_user_id")
        String appUserId,

        @JsonProperty("original_app_user_id")
        String originalAppUserId,

        @JsonProperty("product_id")
        String productId,

        @JsonProperty("entitlement_ids")
        List<String> entitlementIds,

        @JsonProperty("subscription_id")
        String subscriptionId,

        @JsonProperty("period_type")
        String periodType,

        @JsonProperty("purchased_at_ms")
        Long purchasedAtMs,

        @JsonProperty("expiration_at_ms")
        Long expirationAtMs,

        @JsonProperty("environment")
        String environment,

        @JsonProperty("store")
        String store,

        @JsonProperty("cancel_reason")
        String cancelReason

) {
}