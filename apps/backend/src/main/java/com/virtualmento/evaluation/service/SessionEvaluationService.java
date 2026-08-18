package com.virtualmento.evaluation.service;

import java.util.UUID;

import com.virtualmento.evaluation.dto.SessionEvaluationResponse;

public interface SessionEvaluationService {

    SessionEvaluationResponse evaluate(UUID conversationId);

    SessionEvaluationResponse getEvaluation(UUID conversationId);
}