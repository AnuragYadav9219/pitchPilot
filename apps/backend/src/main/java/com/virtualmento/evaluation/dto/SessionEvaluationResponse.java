package com.virtualmento.evaluation.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.virtualmento.evaluation.entity.EvaluationStatus;

public record SessionEvaluationResponse(

        UUID id,

        UUID conversationId,

        EvaluationStatus status,

        Integer overallScore,

        Integer communicationScore,

        Integer clarityScore,

        Integer confidenceScore,

        Integer relevanceScore,

        List<String> strengths,

        List<String> improvements,

        String recommendation,

        String evaluatorFeedback,

        Instant createdAt,

        Instant completedAt

) {
}