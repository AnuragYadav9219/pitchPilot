package com.virtualmento.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String issuer,
        String publicKey,
        String privateKey,
        long accessTokenExpiration) {

}
