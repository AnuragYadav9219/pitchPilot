package com.virtualmentor.evaluation.dto;

import java.time.Instant;
import java.util.UUID;

public record EvaluationSummaryResponse(
                UUID conversationId,
                String conversationTitle,
                String conversationType,
                Integer overallScore,
                Integer communicationScore,
                Integer clarityScore,
                Integer confidenceScore,
                Integer relevanceScore,
                Instant completedAt) {
}