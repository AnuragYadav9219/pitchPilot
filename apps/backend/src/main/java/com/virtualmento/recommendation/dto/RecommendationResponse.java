package com.virtualmento.recommendation.dto;

public record RecommendationResponse(
        boolean available,
        String targetSkill,
        Integer currentScore,
        String reason) {
}