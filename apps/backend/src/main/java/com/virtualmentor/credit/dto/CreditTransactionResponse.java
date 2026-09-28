package com.virtualmentor.credit.dto;

import java.time.Instant;
import java.util.UUID;

import com.virtualmentor.credit.entity.CreditTransactionType;

public record CreditTransactionResponse(
        UUID id,
        long amount,
        CreditTransactionType type,
        String action,
        String description,
        Instant createdAt) {
}