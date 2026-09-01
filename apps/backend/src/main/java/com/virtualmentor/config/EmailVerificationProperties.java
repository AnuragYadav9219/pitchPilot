package com.virtualmentor.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.email-verification")
public record EmailVerificationProperties(
                long expirationSeconds) {

}
