package com.virtualmentor.subscription.service.razorpay;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import com.virtualmentor.subscription.service.credit.SubscriptionCreditService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RazorpaySubscriptionService {

    private final RazorpayClient razorpayClient;
    private final RazorpayProperties properties;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionCreditService subscriptionCreditService;

    // ============================================================
    // CREATE SUBSCRIPTION
    // ============================================================

    public RazorpayCreateSubscriptionResponse createSubscription(UUID userId, SubscriptionPlan plan) {

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

            subscription.setProvider(BillingProvider.RAZORPAY);
            subscription.setProviderSubscriptionId(razorpaySubscription.get("id"));
            subscription.setProductId(planId);
            subscription.setPlan(plan);
            subscription.setStatus(SubscriptionStatus.INACTIVE);
            subscription.setAutoRenew(false);

            subscriptionRepository.save(subscription);

            log.info(
                    "Razorpay subscription created: userId={}, "
                            + "subscriptionId={}, razorpaySubscriptionId={}, plan={}",
                    userId,
                    subscription.getId(),
                    razorpaySubscription.get("id"),
                    plan);

            return new RazorpayCreateSubscriptionResponse(
                    razorpaySubscription.get("id"),
                    properties.keyId(),
                    plan);

        } catch (RazorpayException ex) {

            log.error(
                    "Failed to create Razorpay subscription: userId={}, plan={}",
                    userId,
                    plan,
                    ex);

            throw new IllegalStateException("Unable to create Razorpay subscription", ex);
        }
    }

    // ============================================================
    // VERIFY PAYMENT
    // ============================================================

    @Transactional
    public RazorpayVerifyResponse verifyPayment(UUID userId, RazorpayVerifyRequest request) {

        log.info(
                "Verifying Razorpay payment: userId={}, " +
                        "paymentId={}, subscriptionId={}",
                userId,
                request.razorpayPaymentId(),
                request.razorpaySubscriptionId());

        try {

            razorpayClient.verifySubscriptionPayment(
                    request.razorpayPaymentId(),
                    request.razorpaySubscriptionId(),
                    request.razorpaySignature());

        } catch (RazorpayException ex) {

            log.error(
                    "Razorpay payment verification failed: userId={}, " +
                            "paymentId={}, subscriptionId={}",
                    userId,
                    request.razorpayPaymentId(),
                    request.razorpaySubscriptionId(),
                    ex);

            throw new IllegalArgumentException("Razorpay payment verification failed", ex);
        }

        Subscription subscription = subscriptionRepository
                .findByUserId(userId)
                .orElseThrow(() -> new IllegalStateException("Subscription not found"));

        if (!request.razorpaySubscriptionId().equals(subscription.getProviderSubscriptionId())) {

            throw new IllegalArgumentException("Subscription does not belong to the current user");
        }

        SubscriptionPlan plan = resolvePlanFromProduct(subscription.getProductId());

        if (plan == SubscriptionPlan.FREE) {

            throw new IllegalStateException("Unable to determine subscription plan");
        }

        subscription.setProvider(BillingProvider.RAZORPAY);
        subscription.setPlan(plan);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setAutoRenew(true);

        if (subscription.getStartedAt() == null) {

            subscription.setStartedAt(Instant.now());
        }

        subscriptionRepository.save(subscription);

        log.info(
                "Subscription activated: userId={}, " +
                        "subscriptionId={}, plan={}",
                userId,
                subscription.getId(),
                plan);

        String billingReference = request.razorpayPaymentId();

        try {
            subscriptionCreditService.grantMonthlyCredits(
                    subscription.getUserId(),
                    subscription.getId(),
                    billingReference);

            log.info(
                    "Initial subscription credits processed: " +
                            "userId={}, subscriptionId={}, plan={}",
                    userId,
                    subscription.getId(),
                    plan);

        } catch (Exception ex) {

            log.error(
                    "Subscription activated but initial credit grant failed: " +
                            "userId={}, subscriptionId={}, plan={}",
                    userId,
                    subscription.getId(),
                    plan,
                    ex);
        }

        return new RazorpayVerifyResponse(subscription.getPlan(), subscription.getStatus());
    }

    // ============================================================
    // PRIVATE METHODS
    // ============================================================

    private String resolvePlanId(
            SubscriptionPlan plan) {

        return switch (plan) {

            case PRO ->
                properties.proPlanId();

            case PREMIUM ->
                properties.premiumPlanId();

            case FREE ->
                throw new IllegalArgumentException("FREE plan cannot be purchased");
        };
    }

    private SubscriptionPlan resolvePlanFromProduct(String productId) {

        if (productId == null || productId.isBlank()) {

            throw new IllegalArgumentException("Razorpay product ID is missing");
        }

        if (productId.equals(properties.proPlanId())) {

            return SubscriptionPlan.PRO;
        }

        if (productId.equals(properties.premiumPlanId())) {

            return SubscriptionPlan.PREMIUM;
        }

        throw new IllegalArgumentException("Unknown Razorpay plan");
    }
}