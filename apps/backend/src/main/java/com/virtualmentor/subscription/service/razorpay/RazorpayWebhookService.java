package com.virtualmentor.subscription.service.razorpay;

import java.time.Instant;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.razorpay.Utils;
import com.virtualmentor.config.properties.RazorpayProperties;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.repository.SubscriptionRepository;
import com.virtualmentor.subscription.service.credit.SubscriptionCreditService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RazorpayWebhookService {

    private final RazorpayProperties properties;
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionCreditService subscriptionCreditService;

    @Transactional
    public void process(String payload, String signature) {

        verifySignature(payload, signature);

        JSONObject webhook = new JSONObject(payload);

        String event = webhook.optString("event");

        switch (event) {

            case "subscription.activated" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.ACTIVE,
                        false);

            case "subscription.charged" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.ACTIVE,
                        true);

            case "subscription.cancelled" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.CANCELLED,
                        false);

            case "subscription.completed" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.EXPIRED,
                        false);

            case "subscription.halted" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.BILLING_RETRY,
                        false);

            default -> {
                // Event does not require a local subscription update.
            }
        }
    }

    private void verifySignature(String payload, String signature) {

        try {

            Utils.verifyWebhookSignature(
                    payload,
                    signature,
                    properties.webhookSecret());

        } catch (Exception ex) {

            throw new IllegalArgumentException(
                    "Invalid Razorpay webhook signature",
                    ex);
        }
    }

    private void updateSubscription(JSONObject webhook, SubscriptionStatus status, boolean grantCredits) {

        JSONObject payload = webhook.optJSONObject("payload");

        if (payload == null) {
            return;
        }

        JSONObject subscriptionPayload = payload.optJSONObject("subscription");

        if (subscriptionPayload == null) {
            return;
        }

        JSONObject entity = subscriptionPayload.optJSONObject("entity");

        if (entity == null) {
            return;
        }

        String razorpaySubscriptionId = entity.optString("id", null);

        if (razorpaySubscriptionId == null
                || razorpaySubscriptionId.isBlank()) {
            return;
        }

        Subscription subscription = subscriptionRepository
                .findByProviderSubscriptionId(razorpaySubscriptionId)
                .orElse(null);

        if (subscription == null) {
            return;
        }

        subscription.setStatus(status);

        if (status == SubscriptionStatus.ACTIVE) {

            subscription.setPlan(resolvePlan(subscription.getProductId()));

            subscription.setAutoRenew(true);

            if (subscription.getStartedAt() == null) {
                subscription.setStartedAt(Instant.now());
            }
        }

        if (status == SubscriptionStatus.CANCELLED || status == SubscriptionStatus.EXPIRED) {

            subscription.setAutoRenew(false);
        }

        subscriptionRepository.save(subscription);

        if (grantCredits) {

            String paymentReference = extractBillingReference(webhook);

            subscriptionCreditService.grantMonthlyCredits(
                    subscription.getUserId(),
                    subscription.getId(),
                    paymentReference);
        }
    }

    private String extractBillingReference(JSONObject webhook) {

        JSONObject payload = webhook.optJSONObject("payload");

        if (payload == null) {
            throw new IllegalArgumentException("Razorpay webhook payload is missing");
        }

        JSONObject paymentPayload = payload.optJSONObject("payment");

        if (paymentPayload == null) {
            return webhook.optString("id", UUID.randomUUID().toString());
        }

        JSONObject entity = paymentPayload.optJSONObject("entity");

        if (entity == null) {
            return webhook.optString("id", UUID.randomUUID().toString());
        }

        String paymentId = entity.optString("id", null);

        if (paymentId == null || paymentId.isBlank()) {
            throw new IllegalArgumentException("Razorpay payment ID is missing");
        }

        return paymentId;
    }

    private SubscriptionPlan resolvePlan(String productId) {

        if (productId == null) {
            return SubscriptionPlan.FREE;
        }

        if (productId.equals(properties.proPlanId())) {

            return SubscriptionPlan.PRO;
        }

        if (productId.equals(properties.premiumPlanId())) {

            return SubscriptionPlan.PREMIUM;
        }

        return SubscriptionPlan.FREE;
    }
}