package com.virtualmentor.subscription.service.razorpay;

import java.util.UUID;

import org.json.JSONObject;
import org.springframework.stereotype.Component;

import com.razorpay.RazorpayException;
import com.razorpay.Subscription;
import com.razorpay.Utils;
import com.virtualmentor.config.properties.RazorpayProperties;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RazorpayClient {

    private final RazorpayProperties properties;

    private com.razorpay.RazorpayClient client()
            throws RazorpayException {

        return new com.razorpay.RazorpayClient(
                properties.keyId(),
                properties.keySecret());
    }

    // ================= CREATE SUBSCRIPTION ====================
    public Subscription createSubscription(
            String planId,
            UUID userId) throws RazorpayException {

        JSONObject request = new JSONObject();

        request.put("plan_id", planId);
        request.put("total_count", 12);
        request.put("quantity", 1);
        request.put("customer_notify", 1);

        JSONObject notes = new JSONObject();
        notes.put("user_id", userId.toString());

        request.put("notes", notes);

        return client().subscriptions
                .create(request);
    }

    // ================= VERIFY SUBSCRIPTION PAYMENT ====================
    public void verifySubscriptionPayment(
            String paymentId,
            String subscriptionId,
            String signature) throws RazorpayException {

        JSONObject attributes = new JSONObject();

        attributes.put("razorpay_payment_id", paymentId);
        attributes.put("razorpay_subscription_id", subscriptionId);
        attributes.put("razorpay_signature", signature);

        Utils.verifySubscription(attributes, properties.keySecret());
    }
}