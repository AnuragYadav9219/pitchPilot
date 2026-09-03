package com.virtualmentor.subscription.dto.razorpay;

import com.virtualmentor.subscription.entity.SubscriptionPlan;

import jakarta.validation.constraints.NotNull;

public record RazorpayCreateSubscriptionRequest(
        @NotNull SubscriptionPlan plan) {
}