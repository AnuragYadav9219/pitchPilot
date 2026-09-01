package com.virtualmentor.subscription.dto.revenuecat;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record RevenueCatEntitlementsResponse(

                String object,

                List<RevenueCatActiveEntitlement> items,

                @JsonProperty("next_page") String nextPage,

                String url) {

}
