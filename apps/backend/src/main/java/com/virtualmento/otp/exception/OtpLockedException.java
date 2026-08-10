package com.virtualmento.otp.exception;

public class OtpLockedException
        extends RuntimeException {

    public OtpLockedException() {
        super("OTP verification attempts exceeded");
    }
}