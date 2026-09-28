package com.virtualmentor.ai.model;

import java.time.Instant;

import lombok.Builder;

@Builder 
public record GeminiAuthTokenRequest(
        int uses,
        Instant expireTime,
        Instant newSessionExpireTime,
        GeminiAuthTokenConfig config) {
}