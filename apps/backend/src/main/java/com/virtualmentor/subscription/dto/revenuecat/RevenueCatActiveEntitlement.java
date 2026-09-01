package com.virtualmentor.subscription.dto.revenuecat;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatActiveEntitlement(

                String object,

                @JsonProperty("entitlement_id") String entitlementId,

                @JsonProperty("expires_at") Long expiresAt) {
}