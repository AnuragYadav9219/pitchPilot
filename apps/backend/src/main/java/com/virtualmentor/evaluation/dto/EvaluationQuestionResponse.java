package com.virtualmentor.evaluation.dto;

import java.util.UUID;

import com.virtualmentor.evaluation.entity.EvaluationQuestionResult;

public record EvaluationQuestionResponse(

        UUID id,

        Integer questionNumber,

        String question,

        String userAnswer,

        Double score,

        String feedback) {

    public static EvaluationQuestionResponse from(EvaluationQuestionResult result) {

        return new EvaluationQuestionResponse(
                result.getId(),
                result.getQuestionNumber(),
                result.getQuestion(),
                result.getUserAnswer(),
                result.getScore(),
                result.getFeedback());
    }
}