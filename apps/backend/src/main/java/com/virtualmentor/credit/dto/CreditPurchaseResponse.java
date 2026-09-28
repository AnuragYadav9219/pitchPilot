package com.virtualmentor.credit.dto;

import java.util.UUID;

public record CreditPurchaseResponse(
        UUID purchaseId,
        String packageCode,
        long credits,
        long amountInPaise,
        String razorpayOrderId,
        String razorpayKeyId) {
}