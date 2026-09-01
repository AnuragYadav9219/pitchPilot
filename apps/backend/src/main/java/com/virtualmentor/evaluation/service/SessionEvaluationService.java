package com.virtualmentor.evaluation.service;

import java.util.UUID;

import com.virtualmentor.evaluation.dto.SessionEvaluationResponse;

public interface SessionEvaluationService {

    SessionEvaluationResponse evaluate(UUID conversationId);

    SessionEvaluationResponse getEvaluation(UUID conversationId);
}