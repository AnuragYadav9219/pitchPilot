package com.virtualmentor.evaluation.provider.model;

public record QuestionEvaluation(

        int questionNumber,

        String question,

        String userAnswer,

        double score,

        String feedback) {
}