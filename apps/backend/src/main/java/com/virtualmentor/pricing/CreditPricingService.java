package com.virtualmentor.pricing;

import java.math.BigDecimal;

public interface CreditPricingService {

    BigDecimal calculatePrice(long credits);

    long calculatePriceInPaise(long credits);
}