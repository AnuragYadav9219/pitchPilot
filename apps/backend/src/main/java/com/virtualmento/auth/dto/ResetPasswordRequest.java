package com.virtualmento.auth.dto;

import com.virtualmento.otp.entity.OtpChannel;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ResetPasswordRequest(

        @NotBlank(message = "Email or phone is required") 
        String identifier,

        @NotNull(message = "OTP channel is required") 
        OtpChannel channel,

        @NotBlank(message = "OTP is required") 
        @Pattern(regexp = "\\d{6}", message = "OTP must be 6 digits") 
        String otp,

        @NotBlank(message = "New password is required") 
        @Size(min = 8, max = 128, message = "Password must be between 8 and 128 characters") 
        String newPassword

) {
}