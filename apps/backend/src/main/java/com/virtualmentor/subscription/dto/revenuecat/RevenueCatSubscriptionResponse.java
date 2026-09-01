package com.virtualmentor.subscription.dto.revenuecat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatSubscriptionResponse(

        String object,

        List<RevenueCatSubscription> items,

        @JsonProperty("next_page") 
        String nextPage,

        String url) {

}
