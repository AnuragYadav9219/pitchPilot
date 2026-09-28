package com.virtualmentor.evaluation.provider.model;

import lombok.Builder;

import java.util.List;

@Builder
public record EvaluationRequest(
        String role,
        String interviewType,
        String difficulty,
        List<String> questions,
        List<String> answers) {
}