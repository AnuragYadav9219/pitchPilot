package com.virtualmentor.credit.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.credit.dto.CreateCreditPurchaseRequest;
import com.virtualmentor.credit.dto.CreditPackageResponse;
import com.virtualmentor.credit.dto.CreditPurchaseResponse;
import com.virtualmentor.credit.dto.VerifyCreditPurchaseRequest;
import com.virtualmentor.credit.service.CreditPurchaseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditPurchaseController {

    private final CreditPurchaseService creditPurchaseService;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    /**
     * Get all available credit packages.
     */
    @GetMapping("/packages")
    public ResponseEntity<ApiResponse<List<CreditPackageResponse>>> getPackages() {

        List<CreditPackageResponse> packages = creditPurchaseService.getPackages();

        return responseBuilder.ok("Credit packages fetched successfully", packages);
    }

    /**
     * Create a Razorpay order for purchasing credits.
     */
    @PostMapping("/purchases")
    public ResponseEntity<ApiResponse<CreditPurchaseResponse>> createPurchase(
            @RequestBody CreateCreditPurchaseRequest request) {

        UUID userId = currentUserProvider.getUserId();

        CreditPurchaseResponse purchase = creditPurchaseService.createPurchase(userId, request);

        return responseBuilder.ok("Credit purchase created successfully", purchase);
    }

    /**
     * Verify Razorpay payment and grant purchased credits.
     */
    @PostMapping("/purchases/verify")
    public ResponseEntity<ApiResponse<CreditPurchaseResponse>> verifyPurchase(
            @RequestBody VerifyCreditPurchaseRequest request) {

        UUID userId = currentUserProvider.getUserId();

        CreditPurchaseResponse purchase = creditPurchaseService.verifyPurchase(userId, request);

        return responseBuilder.ok("Credit purchase completed successfully", purchase);
    }
}