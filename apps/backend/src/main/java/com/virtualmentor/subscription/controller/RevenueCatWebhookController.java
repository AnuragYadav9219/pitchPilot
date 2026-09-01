package com.virtualmentor.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.subscription.dto.revenuecat.RevenueCatWebhookRequest;
import com.virtualmentor.subscription.service.revenuecat.RevenueCatWebhookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/webhooks/revenuecat")
@RequiredArgsConstructor
public class RevenueCatWebhookController {

    private final RevenueCatWebhookService webhookService;

    @PostMapping
    public ResponseEntity<Void> handleWebhook(@RequestBody RevenueCatWebhookRequest request) {

        webhookService.process(request.event());

        return ResponseEntity.ok().build();
    }
}
