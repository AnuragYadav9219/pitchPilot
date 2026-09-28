package com.virtualmentor.evaluation.service;

import java.util.UUID;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;

public interface EvaluationService {

    InterviewEvaluation evaluate(
            Long interviewId,
            UUID userId);

    InterviewEvaluation getEvaluation(
            Long interviewId,
            UUID userId);
}