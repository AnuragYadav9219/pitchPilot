package com.virtualmentor.otp.exception;

public class OtpRateLimitException
        extends RuntimeException {

    public OtpRateLimitException() {
        super("Please wait before requesting another OTP");
    }
}