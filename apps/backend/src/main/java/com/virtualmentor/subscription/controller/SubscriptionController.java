package com.virtualmentor.subscription.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.subscription.dto.SubscriptionResponse;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.service.EntitlementService;
import com.virtualmentor.subscription.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final EntitlementService entitlementService;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<SubscriptionResponse>> getMySubscription() {

        var userId = currentUserProvider.getUserId();

        Subscription subscription = subscriptionService.getOrCreate(userId);

        return responseBuilder.ok(
                "Subscription fetched successfully",
                toResponse(subscription, userId));
    }

    @PostMapping("/sync")
    public ResponseEntity<ApiResponse<SubscriptionResponse>> sync() {

        var userId = currentUserProvider.getUserId();

        Subscription subscription = subscriptionService.sync(userId);

        return responseBuilder.ok(
                "Subscription synchronized successfully",
                toResponse(subscription, userId));
    }

    private SubscriptionResponse toResponse(
            Subscription subscription,
            UUID userId) {

        return new SubscriptionResponse(
                subscription.getId(),
                subscription.getPlan(),
                subscription.getStatus(),
                entitlementService.getEntitlements(userId),
                subscription.getStartedAt(),
                subscription.getExpiresAt(),
                subscription.isAutoRenew());
    }
}
