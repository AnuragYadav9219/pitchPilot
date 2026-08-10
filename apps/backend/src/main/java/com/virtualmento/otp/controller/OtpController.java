package com.virtualmento.otp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.otp.dto.SendOtpRequest;
import com.virtualmento.otp.dto.VerifyOtpRequest;
import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpPurpose;
import com.virtualmento.otp.service.OtpService;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/otp")
@RequiredArgsConstructor
public class OtpController {

        private final OtpService otpService;
        private final UserRepository userRepository;
        private final ResponseBuilder responseBuilder;

        // =========================================================
        // SEND EMAIL VERIFICATION OTP
        // =========================================================

        @PostMapping("/send")
        public ResponseEntity<ApiResponse<Void>> send(
                        @Valid @RequestBody SendOtpRequest request) {

                userRepository
                                .findByEmail(
                                                request.email()
                                                                .trim()
                                                                .toLowerCase())
                                .ifPresent(user -> otpService.send(
                                                user,
                                                OtpPurpose.EMAIL_VERIFICATION,
                                                OtpChannel.EMAIL));

                return responseBuilder.ok(
                                "If the account is eligible, an OTP has been sent",
                                null);
        }

        // =========================================================
        // VERIFY EMAIL OTP
        // =========================================================

        @PostMapping("/verify")
        public ResponseEntity<ApiResponse<Void>> verify(
                        @Valid @RequestBody VerifyOtpRequest request) {

                User user = userRepository
                                .findByEmail(
                                                request.email()
                                                                .trim()
                                                                .toLowerCase())
                                .orElseThrow(() -> new IllegalArgumentException(
                                                "Invalid OTP"));

                otpService.verify(
                                user,
                                OtpPurpose.EMAIL_VERIFICATION,
                                OtpChannel.EMAIL,
                                request.otp());

                return responseBuilder.ok(
                                "OTP verified successfully",
                                null);
        }
}