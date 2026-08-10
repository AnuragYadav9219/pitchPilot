package com.virtualmento.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.otp")
public record OtpProperties(

        int expirationSeconds,

        int maxAttempts,

        int resendCooldownSeconds

) {
}