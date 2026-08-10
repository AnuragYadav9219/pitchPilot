package com.virtualmento.common.security;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

import org.springframework.stereotype.Component;

@Component
public class TokenHasher {

    public String hash(String token) {

        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException(
                    "Token cannot be null or blank");
        }

        try {

            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(
                    token.getBytes(
                            StandardCharsets.UTF_8));

            return HexFormat
                    .of()
                    .formatHex(hash);

        } catch (NoSuchAlgorithmException ex) {

            throw new IllegalStateException(
                    "SHA-256 algorithm is unavailable",
                    ex);
        }
    }
}