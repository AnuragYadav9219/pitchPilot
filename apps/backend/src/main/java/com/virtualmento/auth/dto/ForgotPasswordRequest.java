package com.virtualmento.auth.dto;

import com.virtualmento.otp.entity.OtpChannel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ForgotPasswordRequest(

        @NotBlank(message = "Email or phone is required")
        String identifier,

        @NotNull(message = "OTP channel is required")
        OtpChannel channel

) {
}