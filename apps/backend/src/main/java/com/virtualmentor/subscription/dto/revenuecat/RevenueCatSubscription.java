package com.virtualmentor.subscription.dto.revenuecat;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatSubscription(

        String object,

        String id,

        @JsonProperty("customer_id")
        String customerId,

        @JsonProperty("original_customer_id")
        String originalCustomerId,

        @JsonProperty("product_id")
        String productId,

        @JsonProperty("starts_at")
        Long startsAt,

        @JsonProperty("current_period_starts_at")
        Long currentPeriodStartsAt,

        @JsonProperty("current_period_ends_at")
        Long currentPeriodEndsAt,

        @JsonProperty("ends_at")
        Long endsAt,

        @JsonProperty("gives_access")
        Boolean givesAccess,

        @JsonProperty("pending_payment")
        Boolean pendingPayment,

        @JsonProperty("auto_renewal_status")
        String autoRenewalStatus,

        String status,

        String environment,

        String store,

        @JsonProperty("store_subscription_identifier")
        String storeSubscriptionIdentifier

) {
}