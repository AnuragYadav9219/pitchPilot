package com.virtualmentor.otp.model;

import com.virtualmentor.otp.entity.OtpChannel;

public record OtpDestination(
                OtpChannel channel,
                String target) {
}