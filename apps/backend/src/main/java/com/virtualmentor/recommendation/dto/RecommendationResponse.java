package com.virtualmentor.recommendation.dto;

public record RecommendationResponse(
                boolean available,
                String targetSkill,
                Integer currentScore,
                String reason) {
}