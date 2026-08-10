package com.virtualmento.auth.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.virtualmento.config.properties.JwtProperties;
import com.virtualmento.user.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtEncoder jwtEncoder;
    private final JwtProperties jwtProperties;

    public String generateAccessToken(User user, UUID sessionId) {

        Instant now = Instant.now();

        Instant expiresAt = now.plus(
                jwtProperties.accessTokenExpiration(),
                ChronoUnit.SECONDS
        );

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(jwtProperties.issuer())
                .subject(user.getId().toString())
                .issuedAt(now)
                .expiresAt(expiresAt)
                .id(UUID.randomUUID().toString())
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .build();

        JwsHeader header = JwsHeader
                .with(SignatureAlgorithm.RS256)
                .type("JWT")
                .build();

        return jwtEncoder
                .encode(
                        JwtEncoderParameters.from(
                                header,
                                claims
                        )
                )
                .getTokenValue();
    }

    public long getAccessTokenExpiration() {
        return jwtProperties.accessTokenExpiration();
    }
}