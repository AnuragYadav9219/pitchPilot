package com.virtualmentor.ai.model;

import lombok.Builder;

import java.util.List;

@Builder
public record AiRequest(
        String systemPrompt,
        String userPrompt,
        List<String> context) {
}