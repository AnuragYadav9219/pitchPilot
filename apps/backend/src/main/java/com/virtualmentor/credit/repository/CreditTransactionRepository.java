package com.virtualmentor.credit.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.credit.entity.CreditTransaction;
import com.virtualmentor.credit.entity.CreditTransactionType;

public interface CreditTransactionRepository
                extends JpaRepository<CreditTransaction, UUID> {

        Page<CreditTransaction> findByUserIdOrderByCreatedAtDesc(
                        UUID userId,
                        Pageable pageable);

        boolean existsByUserIdAndReferenceIdAndType(
                        UUID userId,
                        UUID referenceId,
                        CreditTransactionType type);

        Optional<CreditTransaction> findByIdempotencyKey(String idempotencyKey);
}