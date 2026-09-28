package com.virtualmentor.ai.model;

import lombok.Builder;

@Builder 
public record GeminiAuthTokenConfig(
        GeminiBidiGenerateContentSetup bidiGenerateContentSetup) {
}