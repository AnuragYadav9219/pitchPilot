package com.virtualmentor.credit.dto;

public record VerifyCreditPurchaseRequest(
        String razorpayOrderId,
        String razorpayPaymentId,
        String razorpaySignature) {
}