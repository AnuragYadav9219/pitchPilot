package com.virtualmentor.subscription.service.razorpay;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.razorpay.RazorpayException;
import com.virtualmentor.config.properties.RazorpayProperties;
import com.virtualmentor.subscription.dto.razorpay.RazorpayCreateSubscriptionResponse;
import com.virtualmentor.subscription.dto.razorpay.RazorpayVerifyRequest;
import com.virtualmentor.subscription.dto.razorpay.RazorpayVerifyResponse;
import com.virtualmentor.subscription.entity.BillingProvider;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RazorpaySubscriptionService {

    private final RazorpayClient razorpayClient;
    private final RazorpayProperties properties;
    private final SubscriptionRepository subscriptionRepository;

    public RazorpayCreateSubscriptionResponse createSubscription(
            UUID userId,
            SubscriptionPlan plan) {

        if (plan != SubscriptionPlan.PRO && plan != SubscriptionPlan.PREMIUM) {

            throw new IllegalArgumentException("Only paid plans can be purchased");
        }

        String planId = resolvePlanId(plan);

        try {

            var razorpaySubscription = razorpayClient.createSubscription(planId, userId);

            Subscription subscription = subscriptionRepository
                    .findByUserId(userId)
                    .orElseGet(() -> Subscription.builder()
                            .userId(userId)
                            .build());

            /*
             * Payment has NOT been completed yet.
             *
             * Therefore we intentionally keep the local
             * subscription inactive.
             */
            subscription.setProvider(BillingProvider.RAZORPAY);
            subscription.setProviderSubscriptionId(razorpaySubscription.get("id"));
            subscription.setProductId(planId);
            subscription.setPlan(SubscriptionPlan.FREE);
            subscription.setStatus(SubscriptionStatus.INACTIVE);
            subscription.setAutoRenew(false);

            subscriptionRepository.save(subscription);

            return new RazorpayCreateSubscriptionResponse(
                    razorpaySubscription.get("id"),
                    properties.keyId(),
                    plan);

        } catch (RazorpayException ex) {

            throw new IllegalStateException(
                    "Unable to create Razorpay subscription",
                    ex);
        }
    }

    // ================== VERIFY PAYMENT =====================
    public RazorpayVerifyResponse verifyPayment(
            UUID userId,
            RazorpayVerifyRequest request) {

        try {

            razorpayClient.verifySubscriptionPayment(
                    request.razorpayPaymentId(),
                    request.razorpaySubscriptionId(),
                    request.razorpaySubscriptionId());

        } catch (RazorpayException ex) {

            throw new IllegalArgumentException(
                    "Razorpay payment verification failed",
                    ex);
        }

        Subscription subscription = subscriptionRepository
                .findByUserId(userId)
                .orElseThrow(() -> new IllegalStateException("Subscription not found"));

        if (!request.razorpaySubscriptionId().equals(subscription.getProviderSubscriptionId())) {
            throw new IllegalArgumentException("Subscription does not belong to the current user");
        }

        subscription.setProvider(BillingProvider.RAZORPAY);
        subscription.setPlan(resolvePlanFromProduct(subscription.getProductId()));
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setAutoRenew(true);
        subscription.setStartedAt(Instant.now());

        subscriptionRepository.save(subscription);

        return new RazorpayVerifyResponse(
                subscription.getPlan(),
                subscription.getStatus());
    }

    // ================== PRIVATE METHODS ====================

    private String resolvePlanId(SubscriptionPlan plan) {

        return switch (plan) {

            case PRO -> properties.proPlanId();

            case PREMIUM -> properties.premiumPlanId();

            case FREE -> throw new IllegalArgumentException("FREE plan cannot be purchased");
        };
    }

    private SubscriptionPlan resolvePlanFromProduct(String productId) {

        if (productId.equals(properties.proPlanId())) {
            return SubscriptionPlan.PRO;
        }

        if (productId.equals(properties.premiumPlanId())) {
            return SubscriptionPlan.PREMIUM;
        }

        throw new IllegalArgumentException("Unknown Razorpay plan");
    }
}