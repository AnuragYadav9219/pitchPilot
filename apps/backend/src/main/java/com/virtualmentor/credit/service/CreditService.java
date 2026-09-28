package com.virtualmentor.credit.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.virtualmentor.credit.dto.CreditBalanceResponse;
import com.virtualmentor.credit.dto.CreditTransactionResponse;
import com.virtualmentor.credit.entity.CreditTransactionType;

public interface CreditService {

        CreditBalanceResponse getBalance(UUID userId);

        Page<CreditTransactionResponse> getTransactions(
                        UUID userId,
                        Pageable pageable);

        void grant(
                        UUID userId,
                        long amount,
                        CreditTransactionType type,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        void consume(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        void refund(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        void reserve(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        void consumeReservation(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        void releaseReservation(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description);

        boolean hasReservation(
                        UUID userId,
                        UUID referenceId);
}
