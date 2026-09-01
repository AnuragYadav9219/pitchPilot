package com.virtualmentor.otp.exception;

public class OtpLockedException
        extends RuntimeException {

    public OtpLockedException() {
        super("OTP verification attempts exceeded");
    }
}