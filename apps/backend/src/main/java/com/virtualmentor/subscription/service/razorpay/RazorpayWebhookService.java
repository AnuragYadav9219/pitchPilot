package com.virtualmentor.subscription.service.razorpay;

import java.time.Instant;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.razorpay.Utils;
import com.virtualmentor.config.properties.RazorpayProperties;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RazorpayWebhookService {

    private final RazorpayProperties properties;
    private final SubscriptionRepository subscriptionRepository;

    @Transactional
    public void process(String payload, String signature) {

        verifySignature(payload, signature);

        JSONObject webhook = new JSONObject(payload);

        String event = webhook.optString("event");

        switch (event) {

            case "subscription.activated" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.ACTIVE);

            case "subscription.charged" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.ACTIVE);

            case "subscription.cancelled" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.CANCELLED);

            case "subscription.completed" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.EXPIRED);

            case "subscription.halted" ->
                updateSubscription(
                        webhook,
                        SubscriptionStatus.BILLING_RETRY);

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

    private void updateSubscription(JSONObject webhook, SubscriptionStatus status) {

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