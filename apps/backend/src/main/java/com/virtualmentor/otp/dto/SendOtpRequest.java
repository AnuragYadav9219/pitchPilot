package com.virtualmentor.otp.dto;

import com.virtualmentor.otp.entity.OtpPurpose;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SendOtpRequest(

                @NotBlank(message = "Email is required") @Email(message = "Invalid email address") String email,

                @NotNull(message = "OTP purpose is required") OtpPurpose purpose

) {
}