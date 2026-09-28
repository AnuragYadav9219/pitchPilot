package com.virtualmentor.credit.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.credit.dto.CreditBalanceResponse;
import com.virtualmentor.credit.dto.CreditTransactionResponse;
import com.virtualmentor.credit.service.CreditService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService creditService;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    @GetMapping("/balance")
    public ResponseEntity<ApiResponse<CreditBalanceResponse>> getBalance() {

        UUID userId = currentUserProvider.getUserId();

        CreditBalanceResponse balance = creditService.getBalance(userId);

        return responseBuilder.ok(
                "Credit balance fetched successfully",
                balance);
    }

    @GetMapping("/transactions")
    public ResponseEntity<ApiResponse<Page<CreditTransactionResponse>>> getTransactions(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        UUID userId = currentUserProvider.getUserId();

        Page<CreditTransactionResponse> transactions = creditService.getTransactions(
                userId,
                pageable);

        return responseBuilder.ok(
                "Credit transactions fetched successfully",
                transactions);
    }
}