package com.virtualmentor.subscription.dto.razorpay;

import jakarta.validation.constraints.NotBlank;

public record RazorpayVerifyRequest(
        @NotBlank String razorpayPaymentId,
        @NotBlank String razorpaySubscriptionId,
        @NotBlank String razorpaySignature) {
}