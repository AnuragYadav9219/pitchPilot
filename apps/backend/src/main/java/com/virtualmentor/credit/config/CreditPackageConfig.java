package com.virtualmentor.credit.config;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "virtualmentor.credits")
@Getter
@Setter
public class CreditPackageConfig {

    private List<CreditPackage> packages = List.of();

    public CreditPackage getPackage(String code) {

        return packages.stream()
                .filter(pkg -> pkg.code().equals(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown credit package: " + code));
    }
}