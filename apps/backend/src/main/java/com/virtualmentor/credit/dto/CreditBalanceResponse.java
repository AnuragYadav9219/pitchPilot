package com.virtualmentor.credit.dto;

import java.util.UUID;

public record CreditBalanceResponse(
    
        UUID userId,

        long balance,
        
        long reserved,
        
        long available) {

}
