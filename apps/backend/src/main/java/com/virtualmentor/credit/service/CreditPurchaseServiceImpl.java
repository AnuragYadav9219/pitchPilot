package com.virtualmentor.credit.service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.razorpay.Order;
import com.virtualmentor.config.configurations.CreditPricingConfig;
import com.virtualmentor.config.properties.RazorpayProperties;
import com.virtualmentor.credit.config.CreditPackage;
import com.virtualmentor.credit.config.CreditPackageConfig;
import com.virtualmentor.credit.dto.CreateCreditPurchaseRequest;
import com.virtualmentor.credit.dto.CreditPackageResponse;
import com.virtualmentor.credit.dto.CreditPurchaseResponse;
import com.virtualmentor.credit.dto.VerifyCreditPurchaseRequest;
import com.virtualmentor.credit.entity.CreditPurchase;
import com.virtualmentor.credit.entity.CreditPurchaseStatus;
import com.virtualmentor.credit.entity.CreditTransactionType;
import com.virtualmentor.credit.repository.CreditPurchaseRepository;
import com.virtualmentor.subscription.service.razorpay.RazorpayClient;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreditPurchaseServiceImpl implements CreditPurchaseService {

    private final CreditPackageConfig creditPackageConfig;
    private final CreditPricingConfig creditPricingConfig;
    private final CreditPurchaseRepository creditPurchaseRepository;
    private final CreditService creditService;
    private final RazorpayClient razorpayClient;
    private final RazorpayProperties razorpayProperties;

    @Override
    @Transactional(readOnly = true)
    public List<CreditPackageResponse> getPackages() {

        return creditPackageConfig.getPackages()
                .stream()
                .map(pkg -> new CreditPackageResponse(
                        pkg.code(),
                        pkg.credits(),
                        creditPricingConfig.calculatePriceInPaise(pkg.credits())))
                .toList();
    }

    @Override
    @Transactional
    public CreditPurchaseResponse createPurchase(UUID userId, CreateCreditPurchaseRequest request) {

        CreditPackage pkg = creditPackageConfig.getPackage(request.packageCode());

        long credits = pkg.credits();
        long amountInPaise = creditPricingConfig.calculatePriceInPaise(credits);

        if (credits <= 0) {
            throw new IllegalStateException("Credit package must contain credits");
        }

        if (amountInPaise <= 0) {
            throw new IllegalStateException("Credit package has invalid price");
        }

        CreditPurchase purchase = CreditPurchase.builder()
                .userId(userId)
                .packageCode(pkg.code())
                .credits(credits)
                .amountInPaise(amountInPaise)
                .status(CreditPurchaseStatus.CREATED)
                .provider("RAZORPAY")
                .createdAt(Instant.now())
                .build();

        purchase = creditPurchaseRepository.save(purchase);

        try {

            Order order = razorpayClient.createCreditOrder(
                    amountInPaise,
                    userId,
                    purchase.getId());

            purchase.setProviderOrderId(order.get("id"));

            purchase = creditPurchaseRepository.save(purchase);

            return new CreditPurchaseResponse(
                    purchase.getId(),
                    purchase.getPackageCode(),
                    purchase.getCredits(),
                    purchase.getAmountInPaise(),
                    purchase.getProviderOrderId(),
                    razorpayProperties.keyId());

        } catch (Exception ex) {
            purchase.setStatus(CreditPurchaseStatus.FAILED);

            creditPurchaseRepository.save(purchase);

            throw new IllegalStateException("Unable to create credit purchase", ex);
        }
    }

    @Override
    @Transactional
    public CreditPurchaseResponse verifyPurchase(UUID userId, VerifyCreditPurchaseRequest request) {

        if (creditPurchaseRepository.existsByProviderPaymentId(request.razorpayPaymentId())) {

            CreditPurchase existing = creditPurchaseRepository
                    .findByProviderPaymentId(request.razorpayPaymentId())
                    .orElseThrow();

            return toResponse(existing);
        }

        CreditPurchase purchase = creditPurchaseRepository
                .findByProviderOrderId(request.razorpayOrderId())
                .orElseThrow(() -> new IllegalStateException("Credit purchase not found"));

        if (!purchase.getUserId().equals(userId)) {
            throw new IllegalArgumentException("Credit purchase does not belong to current user");
        }

        if (purchase.getStatus() == CreditPurchaseStatus.PAID) {
            return toResponse(purchase);
        }

        try {

            razorpayClient.verifyCreditPayment(
                    request.razorpayOrderId(),
                    request.razorpayPaymentId(),
                    request.razorpaySignature());

        } catch (Exception ex) {

            purchase.setStatus(CreditPurchaseStatus.FAILED);

            creditPurchaseRepository.save(purchase);

            throw new IllegalArgumentException("Credit payment verification failed", ex);

        }

        purchase.setProviderPaymentId(request.razorpayPaymentId());
        purchase.setStatus(CreditPurchaseStatus.PAID);
        purchase.setCompletedAt(Instant.now());

        purchase = creditPurchaseRepository.save(purchase);

        creditService.grant(
                userId,
                purchase.getCredits(),
                CreditTransactionType.PURCHASE,
                "CREDIT_PURCHASE",
                purchase.getId(),
                "CREDIT_PURCHASE:"
                        + purchase.getId(),
                "Purchased "
                        + purchase.getCredits()
                        + " credits");

        log.info(
                "Credit purchase completed: userId={}, purchaseId={}, credits={}",
                userId,
                purchase.getId(),
                purchase.getCredits());

        return toResponse(purchase);
    }

    private CreditPurchaseResponse toResponse(CreditPurchase purchase) {

        return new CreditPurchaseResponse(
                purchase.getId(),
                purchase.getPackageCode(),
                purchase.getCredits(),
                purchase.getAmountInPaise(),
                purchase.getProviderOrderId(),
                razorpayProperties.keyId());
    }
}
