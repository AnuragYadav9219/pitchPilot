package com.virtualmento.config.securityConfigs;

import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import com.virtualmento.config.properties.JwtProperties;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RsaKeyConfig {

    private final JwtProperties jwtProperties;

    @Bean
    public RSAPublicKey rsaPublicKey() throws Exception {

        byte[] keyBytes = Base64.getDecoder().decode(
                jwtProperties.publicKey());

        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(keyBytes);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return (RSAPublicKey) keyFactory.generatePublic(keySpec);
    }

    @Bean
    public RSAPrivateKey rsaPrivateKey() throws Exception {

        byte[] keyBytes = Base64.getDecoder().decode(
                jwtProperties.privateKey());

        PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(keyBytes);

        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
    }

    @Bean
    public JwtEncoder jwtEncoder(
            RSAPublicKey publicKey,
            RSAPrivateKey privateKey) {

        return NimbusJwtEncoder
                .withKeyPair(publicKey, privateKey)
                .algorithm(SignatureAlgorithm.RS256)
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder(
            RSAPublicKey publicKey,
            JwtProperties properties) {

        NimbusJwtDecoder decoder = NimbusJwtDecoder
                .withPublicKey(publicKey)
                .build();

        decoder.setJwtValidator(
                JwtValidators.createDefaultWithIssuer(
                        properties.issuer()));

        return decoder;
    }
}
