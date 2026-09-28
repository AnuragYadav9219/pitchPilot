package com.virtualmentor.config.configurations;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "virtualmentor.pricing")
@Getter
@Setter
public class CreditPricingConfig {

    private BigDecimal creditPriceInRupees = new BigDecimal("0.20");

    public BigDecimal calculatePrice(long credits) {

        if (credits < 0) {
            throw new IllegalArgumentException("Credits cannot be negative");
        }

        return creditPriceInRupees
                .multiply(BigDecimal.valueOf(credits))
                .setScale(2, RoundingMode.HALF_UP);
    }

    public long calculatePriceInPaise(long credits) {

        return calculatePrice(credits)
                .movePointRight(2)
                .longValueExact();
    }
}