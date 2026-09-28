package com.virtualmentor.credit.dto;

public record CreditPackageResponse(
        String code,
        long credits,
        long priceInPaise) {
}