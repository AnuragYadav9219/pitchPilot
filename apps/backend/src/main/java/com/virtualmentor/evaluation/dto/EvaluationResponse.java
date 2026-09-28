package com.virtualmentor.evaluation.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.entity.EvaluationQuestionResult;
import com.virtualmentor.evaluation.enums.EvaluationStatus;

public record EvaluationResponse(

        UUID id,

        Long interviewId,

        EvaluationStatus status,

        Double overallScore,

        Double technicalScore,

        Double communicationScore,

        Double problemSolvingScore,

        Double confidenceScore,

        String summary,

        List<String> strengths,

        List<String> areasToImprove,

        List<String> recommendations,

        List<EvaluationQuestionResponse> questions,

        LocalDateTime createdAt,

        LocalDateTime completedAt) {

    public static EvaluationResponse from(
            InterviewEvaluation evaluation,
            List<EvaluationQuestionResult> questionResults) {

        List<String> strengths = splitLines(evaluation.getStrengths());

        List<String> areasToImprove = splitLines(evaluation.getAreasToImprove());

        List<String> recommendations = splitLines(evaluation.getRecommendations());

        List<EvaluationQuestionResponse> questions = questionResults == null
                ? List.of()
                : questionResults.stream()
                        .map(EvaluationQuestionResponse::from)
                        .toList();

        return new EvaluationResponse(
                evaluation.getId(),
                evaluation.getInterviewId(),
                evaluation.getStatus(),
                evaluation.getOverallScore(),
                evaluation.getTechnicalScore(),
                evaluation.getCommunicationScore(),
                evaluation.getProblemSolvingScore(),
                evaluation.getConfidenceScore(),
                evaluation.getSummary(),
                strengths,
                areasToImprove,
                recommendations,
                questions,
                evaluation.getCreatedAt(),
                evaluation.getCompletedAt());
    }

    private static List<String> splitLines(String value) {

        if (value == null || value.isBlank()) {
            return List.of();
        }

        return value.lines()
                .map(String::trim)
                .filter(line -> !line.isBlank())
                .toList();
    }
}