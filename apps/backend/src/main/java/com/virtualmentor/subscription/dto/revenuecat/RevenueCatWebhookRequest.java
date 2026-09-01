package com.virtualmentor.subscription.dto.revenuecat;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatWebhookRequest(

        @JsonProperty("api_version")
        String apiVersion,

        RevenueCatWebhookEvent event

) {
}