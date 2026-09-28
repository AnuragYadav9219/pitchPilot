package com.virtualmentor.ai.model;

import java.util.Map;

public record AiResponse(
        String content,
        Map<String, Object> metadata) {
}