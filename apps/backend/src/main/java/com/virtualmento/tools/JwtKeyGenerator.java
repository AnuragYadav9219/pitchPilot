package com.virtualmento.tools;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;

public class JwtKeyGenerator {

    public static void main(String[] args) throws Exception {

        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");

        keyPairGenerator.initialize(4096);

        KeyPair keyPair = keyPairGenerator.generateKeyPair();

        String privateKey = Base64.getEncoder()
                .encodeToString(
                        keyPair.getPrivate().getEncoded());

        String publicKey = Base64.getEncoder()
                .encodeToString(
                        keyPair.getPublic().getEncoded());

        System.out.println();
        System.out.println("========== JWT PRIVATE KEY ==========");
        System.out.println(privateKey);

        System.out.println();
        System.out.println("========== JWT PUBLIC KEY ==========");
        System.out.println(publicKey);

        System.out.println();
        System.out.println("Key pair generated successfully.");
    }
}
