package com.virtualmentor.credit.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.credit.entity.CreditPurchase;
import com.virtualmentor.credit.entity.CreditPurchaseStatus;

public interface CreditPurchaseRepository extends JpaRepository<CreditPurchase, UUID> {

    Optional<CreditPurchase> findByIdAndUserId(UUID id, UUID userId);

    Optional<CreditPurchase> findByProviderOrderId(String providerOrderId);

    Optional<CreditPurchase> findByProviderPaymentId(String providerPaymentId);

    boolean existsByProviderPaymentId(String providerPaymentId);

    boolean existsByIdAndUserIdAndStatus(
            UUID id,
            UUID userId,
            CreditPurchaseStatus status);
}