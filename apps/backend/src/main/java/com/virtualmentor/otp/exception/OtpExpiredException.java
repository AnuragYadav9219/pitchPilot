package com.virtualmentor.otp.exception;

public class OtpExpiredException
        extends RuntimeException {

    public OtpExpiredException() {
        super("OTP has expired");
    }
}