package com.virtualmentor.credit.service;

import java.util.List;
import java.util.UUID;

import com.virtualmentor.credit.dto.CreateCreditPurchaseRequest;
import com.virtualmentor.credit.dto.CreditPackageResponse;
import com.virtualmentor.credit.dto.CreditPurchaseResponse;
import com.virtualmentor.credit.dto.VerifyCreditPurchaseRequest;

public interface CreditPurchaseService {

    List<CreditPackageResponse> getPackages();

    CreditPurchaseResponse createPurchase(UUID userId, CreateCreditPurchaseRequest request);

    CreditPurchaseResponse verifyPurchase(UUID userId, VerifyCreditPurchaseRequest request);
}