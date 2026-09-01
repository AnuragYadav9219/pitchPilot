package com.virtualmentor.subscription.service.revenuecat;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.virtualmentor.config.properties.RevenueCatProperties;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatCustomerResponse;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatEntitlementsResponse;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatSubscriptionResponse;

@Component
public class RevenueCatClient {

        private final RestClient restClient;
        private final RevenueCatProperties properties;

        public RevenueCatClient(
                        RestClient.Builder restClientbuilder,
                        RevenueCatProperties properties) {

                this.properties = properties;

                this.restClient = restClientbuilder
                                .baseUrl(properties.baseUrl())
                                .build();
        }

        public RevenueCatCustomerResponse getCustomer(String customerId) {

                return restClient
                                .get()
                                .uri(
                                        "/projects/{projectId}/customers/{customerId}",
                                        properties.projectId(),
                                        customerId)
                                .header(
                                        "Authorization",
                                        "Bearer " + properties.secretKey())
                                .retrieve()
                                .body(RevenueCatCustomerResponse.class);
        }

        public RevenueCatEntitlementsResponse getActiveEntitlements(String customerId) {

                return restClient
                                .get()
                                .uri(
                                        "/projects/{projectId}/customers/{customerId}/active_entitlements",
                                        properties.projectId(),
                                        customerId)
                                .header(
                                        "Authorization",
                                        "Bearer " + properties.secretKey())
                                .retrieve()
                                .body(RevenueCatEntitlementsResponse.class);
        }

        public RevenueCatSubscriptionResponse getSubscriptions(String customerId) {

                return restClient
                                .get()
                                .uri(
                                        "/projects/{projectId}/customers/{customerId}/subscriptions",
                                        properties.projectId(),
                                        customerId)
                                .header(
                                        "Authorization",
                                        "Bearer " + properties.secretKey())
                                .retrieve()
                                .body(RevenueCatSubscriptionResponse.class);
        }
}
