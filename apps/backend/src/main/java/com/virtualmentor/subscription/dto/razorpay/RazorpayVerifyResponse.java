package com.virtualmentor.subscription.dto.razorpay;

import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;

public record RazorpayVerifyResponse(
        SubscriptionPlan plan,
        SubscriptionStatus status) {
}