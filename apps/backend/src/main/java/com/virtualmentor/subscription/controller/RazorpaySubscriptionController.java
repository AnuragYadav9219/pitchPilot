package com.virtualmentor.subscription.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.subscription.dto.razorpay.RazorpayCreateSubscriptionRequest;
import com.virtualmentor.subscription.dto.razorpay.RazorpayCreateSubscriptionResponse;
import com.virtualmentor.subscription.dto.razorpay.RazorpayVerifyRequest;
import com.virtualmentor.subscription.dto.razorpay.RazorpayVerifyResponse;
import com.virtualmentor.subscription.service.razorpay.RazorpaySubscriptionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subscriptions/razorpay")
@RequiredArgsConstructor
public class RazorpaySubscriptionController {

        private final RazorpaySubscriptionService razorpaySubscriptionService;
        private final CurrentUserProvider currentUserProvider;
        private final ResponseBuilder responseBuilder;

        @PostMapping("/create")
        public ResponseEntity<ApiResponse<RazorpayCreateSubscriptionResponse>> create(
                        @Valid @RequestBody RazorpayCreateSubscriptionRequest request) {

                var userId = currentUserProvider.getUserId();

                var response = razorpaySubscriptionService.createSubscription(
                                userId,
                                request.plan());

                return responseBuilder.ok(
                                "Razorpay subscription created",
                                response);
        }

        @PostMapping("/verify")
        public ResponseEntity<ApiResponse<RazorpayVerifyResponse>> verify(
                        @Valid @RequestBody RazorpayVerifyRequest request) {

                var userId = currentUserProvider.getUserId();

                var response = razorpaySubscriptionService.verifyPayment(userId, request);

                return responseBuilder.ok(
                                "Razorpay payment verified successfully",
                                response);
        }
}
