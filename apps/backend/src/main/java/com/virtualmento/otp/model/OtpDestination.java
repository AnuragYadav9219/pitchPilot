package com.virtualmento.otp.model;

import com.virtualmento.otp.entity.OtpChannel;

public record OtpDestination(
        OtpChannel channel,
        String target) {
}