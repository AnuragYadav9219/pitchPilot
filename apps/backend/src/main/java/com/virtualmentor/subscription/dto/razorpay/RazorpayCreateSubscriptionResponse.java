package com.virtualmentor.subscription.dto.razorpay;

import com.virtualmentor.subscription.entity.SubscriptionPlan;;

public record RazorpayCreateSubscriptionResponse(
    String subscriptionId,
    String keyId,
    SubscriptionPlan plan
) {
    
}
