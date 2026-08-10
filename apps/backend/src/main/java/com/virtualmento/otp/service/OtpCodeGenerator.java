package com.virtualmento.otp.service;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class OtpCodeGenerator {

    private static final int OTP_MIN = 100000;
    private static final int OTP_MAX = 999999;

    private final SecureRandom secureRandom =
            new SecureRandom();

    public String generate() {

        int value =
                secureRandom.nextInt(
                        OTP_MAX - OTP_MIN + 1
                ) + OTP_MIN;

        return String.valueOf(value);
    }
}