package com.virtualmentor.otp.exception;

public class InvalidOtpException
        extends RuntimeException {

    public InvalidOtpException() {
        super("Invalid OTP");
    }
}