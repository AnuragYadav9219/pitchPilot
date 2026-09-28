package com.virtualmentor.config.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "security.email-verification")
public record EmailVerificationProperties(
                long expirationSeconds) {

}
