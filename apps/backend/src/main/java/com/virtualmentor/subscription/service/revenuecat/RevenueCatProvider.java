package com.virtualmentor.subscription.service.revenuecat;

import java.time.Instant;
import java.util.Comparator;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.dto.revenuecat.RevenueCatActiveEntitlement;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatEntitlementsResponse;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatSubscription;
import com.virtualmentor.subscription.dto.revenuecat.RevenueCatSubscriptionResponse;
import com.virtualmentor.subscription.entity.BillingProvider;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.mapper.RevenueCatPlanMapper;
import com.virtualmentor.subscription.mapper.RevenueCatStatusMapper;
import com.virtualmentor.subscription.service.SubscriptionProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RevenueCatProvider implements SubscriptionProvider {

        private final RevenueCatClient revenueCatClient;
        private final RevenueCatPlanMapper planMapper;
        private final RevenueCatStatusMapper statusMapper;

        @Override
        public BillingProvider getProvider() {
                return BillingProvider.REVENUECAT;
        }

        @Override
        public SubscriptionInfo getSubscription(String customerId) {

                RevenueCatSubscriptionResponse subscriptionResponse = revenueCatClient.getSubscriptions(customerId);

                RevenueCatSubscription subscription = findCurrentSubscription(subscriptionResponse);

                if (subscription == null) {

                        return new SubscriptionInfo(
                                        customerId,
                                        null,
                                        null,
                                        SubscriptionPlan.FREE,
                                        SubscriptionStatus.INACTIVE,
                                        false,
                                        null,
                                        null,
                                        null);
                }

                SubscriptionPlan plan = resolvePlan(customerId);

                SubscriptionStatus status = statusMapper
                                .toStatus(subscription.status());

                Instant startedAt = toInstant(subscription.startsAt());

                Instant expiresAt = toInstant(subscription.currentPeriodEndsAt());

                boolean autoRenew = "will_renew".equals(subscription.autoRenewalStatus());

                return new SubscriptionInfo(
                                customerId,
                                subscription.id(),
                                subscription.productId(),
                                plan,
                                status,
                                autoRenew,
                                startedAt,
                                expiresAt,
                                subscription.environment());
        }

        private RevenueCatSubscription findCurrentSubscription(RevenueCatSubscriptionResponse response) {

                if (response == null || response.items() == null || response.items().isEmpty()) {
                        return null;
                }

                return response.items()
                                .stream()
                                .max(Comparator.comparing(
                                                RevenueCatSubscription::currentPeriodEndsAt,
                                                Comparator.nullsFirst(Comparator.naturalOrder())))
                                .orElse(null);
        }

        private SubscriptionPlan resolvePlan(String customerId) {

                RevenueCatEntitlementsResponse response = revenueCatClient
                                .getActiveEntitlements(customerId);

                if (response == null || response.items() == null || response.items().isEmpty()) {
                        return SubscriptionPlan.FREE;
                }

                return response.items()
                                .stream()
                                .map(RevenueCatActiveEntitlement::entitlementId)
                                .map(planMapper::toPlan)
                                .max(Comparator.comparingInt(this::planPriority))
                                .orElse(SubscriptionPlan.FREE);
        }

        private int planPriority(SubscriptionPlan plan) {

                return switch (plan) {

                        case FREE -> 0;

                        case PRO -> 1;

                        case PREMIUM -> 2;
                };
        }

        private Instant toInstant(Long millis) {

                if (millis == null) {
                        return null;
                }

                return Instant.ofEpochMilli(millis);
        }
}
