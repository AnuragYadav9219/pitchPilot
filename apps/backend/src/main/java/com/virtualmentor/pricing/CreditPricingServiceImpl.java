package com.virtualmentor.pricing;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.virtualmentor.config.configurations.CreditPricingConfig;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CreditPricingServiceImpl implements CreditPricingService {

    private final CreditPricingConfig config;

    @Override
    public BigDecimal calculatePrice(long credits) {
        return config.calculatePrice(credits);
    }

    @Override
    public long calculatePriceInPaise(long credits) {
        return config.calculatePriceInPaise(credits);
    }
}