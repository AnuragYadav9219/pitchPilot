package com.virtualmento.ai.dto;

import java.util.List;

public record AiEvaluationResult(

        Integer overallScore,

        Integer communicationScore,

        Integer clarityScore,

        Integer confidenceScore,

        Integer relevanceScore,

        List<String> strengths,

        List<String> improvements,

        String recommendation,

        String evaluatorFeedback

) {
}