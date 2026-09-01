package com.virtualmentor.subscription.dto.revenuecat;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatCustomerResponse(

                String object,

                String id,

                @JsonProperty("first_seen_at") Long firstSeenAt,

                @JsonProperty("last_seen_at") Long lastSeenAt,

                @JsonProperty("last_seen_platform") String lastSeenPlatform,

                Map<String, Object> attributes) {

}
