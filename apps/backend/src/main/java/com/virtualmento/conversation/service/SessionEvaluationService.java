package com.virtualmento.conversation.service;

import java.util.UUID;

import com.virtualmento.conversation.dto.SessionEvaluationResponse;

public interface SessionEvaluationService {

    SessionEvaluationResponse evaluate(UUID conversationId);

    SessionEvaluationResponse getEvaluation(UUID conversationId);
}