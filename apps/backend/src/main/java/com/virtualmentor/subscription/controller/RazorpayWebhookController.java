package com.virtualmentor.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.subscription.service.razorpay.RazorpayWebhookService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/webhooks/razorpay")
@RequiredArgsConstructor
public class RazorpayWebhookController {
    
    private final RazorpayWebhookService webhookService;

    @PostMapping
    public ResponseEntity<Void> handleWebhook(
        @RequestHeader("X-Razorpay-Signature") String signature,
        @RequestBody String payload
    ) {

        webhookService.process(payload, signature);

        return ResponseEntity.ok().build();
    }
}
