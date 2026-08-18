package com.virtualmento.conversation.service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tools.jackson.databind.ObjectMapper;
import com.virtualmento.ai.context.EvaluationTranscriptBuilder;
import com.virtualmento.ai.dto.AiEvaluationResult;
import com.virtualmento.ai.prompt.EvaluationPromptBuilder;
import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.service.AiService;
import com.virtualmento.common.exception.ResourceNotFoundException;
import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.conversation.dto.SessionEvaluationResponse;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.entity.EvaluationStatus;
import com.virtualmento.conversation.entity.SessionEvaluation;
import com.virtualmento.conversation.repository.ConversationMessageRepository;
import com.virtualmento.conversation.repository.ConversationRepository;
import com.virtualmento.conversation.repository.SessionEvaluationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class SessionEvaluationServiceImpl implements SessionEvaluationService {

        private final ConversationRepository conversationRepository;
        private final ConversationMessageRepository messageRepository;
        private final SessionEvaluationRepository evaluationRepository;
        private final CurrentUserProvider currentUserProvider;
        private final AiService aiService;
        private final EvaluationPromptBuilder evaluationPromptBuilder;
        private final EvaluationTranscriptBuilder evaluationTranscriptBuilder;
        private final ObjectMapper objectMapper;

        // =========================================================
        // EVALUATE SESSION
        // =========================================================

        @Override
        @Transactional
        public SessionEvaluationResponse evaluate(UUID conversationId) {

                UUID userId = currentUserProvider.getUserId();

                // =====================================================
                // LOAD USER'S CONVERSATION
                // =====================================================

                Conversation conversation = conversationRepository
                                .findByIdAndUserId(conversationId, userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

                // =====================================================
                // CHECK EXISTING EVALUATION
                // =====================================================

                SessionEvaluation existing = evaluationRepository
                                .findByConversationId(conversationId)
                                .orElse(null);

                if (existing != null && existing.getStatus() == EvaluationStatus.COMPLETED) {

                        return toResponse(existing);
                }

                if (existing != null && existing.getStatus() == EvaluationStatus.PROCESSING) {

                        throw new IllegalStateException("Evaluation is already being processed");
                }

                // =====================================================
                // LOAD CONVERSATION MESSAGES
                // =====================================================

                List<ConversationMessage> messages = messageRepository
                                .findByConversationIdOrderByCreatedAtAsc(conversationId);

                if (messages.isEmpty()) {

                        throw new IllegalStateException("Cannot evaluate an empty conversation");
                }

                // =====================================================
                // CREATE / RESET EVALUATION
                // =====================================================

                SessionEvaluation evaluation;

                if (existing == null) {

                        evaluation = SessionEvaluation.builder()
                                        .conversation(conversation)
                                        .status(EvaluationStatus.PROCESSING)
                                        .strengths(Collections.emptyList())
                                        .improvements(Collections.emptyList())
                                        .createdAt(Instant.now())
                                        .build();

                } else {

                        evaluation = existing;

                        evaluation.setStatus(EvaluationStatus.PROCESSING);

                        evaluation.setCompletedAt(null);
                }

                evaluationRepository.save(evaluation);

                // =====================================================
                // BUILD TRANSCRIPT
                // =====================================================

                String transcript = evaluationTranscriptBuilder.build(messages);

                if (transcript.isBlank()) {

                        throw new ResourceNotFoundException("Conversation transcript is empty");
                }

                // =====================================================
                // BUILD EVALUATION PROMPT
                // =====================================================

                String systemInstruction = evaluationPromptBuilder.build(
                                conversation,
                                transcript);

                // =====================================================
                // BUILD AI REQUEST
                // =====================================================

                AiRequest aiRequest = new AiRequest(
                                systemInstruction,
                                List.of(new AiRequest.AiMessage(
                                                "user",
                                                transcript)),
                                null,
                                null,
                                null,
                                null);

                // =====================================================
                // CALL AI
                // =====================================================

                try {

                        log.info(
                                        "Starting session evaluation for conversation {}",
                                        conversationId);

                        AiResponse aiResponse = aiService.generate(aiRequest);

                        // =================================================
                        // PARSE AI RESPONSE
                        // =================================================

                        AiEvaluationResult result = parseEvaluation(
                                        aiResponse);

                        // =================================================
                        // VALIDATE RESULT
                        // =================================================

                        validateResult(result);

                        // =================================================
                        // SAVE EVALUATION
                        // =================================================

                        evaluation.setStatus(EvaluationStatus.COMPLETED);
                        evaluation.setOverallScore(result.overallScore());
                        evaluation.setCommunicationScore(result.communicationScore());
                        evaluation.setClarityScore(result.clarityScore());
                        evaluation.setConfidenceScore(result.confidenceScore());
                        evaluation.setRelevanceScore(result.relevanceScore());
                        evaluation.setStrengths(result.strengths());
                        evaluation.setImprovements(result.improvements());
                        evaluation.setRecommendation(result.recommendation());
                        evaluation.setEvaluatorFeedback(result.evaluatorFeedback());
                        evaluation.setCompletedAt(Instant.now());
                        evaluationRepository.save(evaluation);

                        log.info(
                                        "Session evaluation completed for conversation {}",
                                        conversationId);

                        return toResponse(evaluation);

                } catch (Exception ex) {

                        log.error(
                                        "Session evaluation failed for conversation {}",
                                        conversationId,
                                        ex);

                        // =================================================
                        // MARK EVALUATION AS FAILED
                        // =================================================

                        evaluation.setStatus(EvaluationStatus.FAILED);
                        evaluation.setCompletedAt(Instant.now());

                        evaluationRepository.save(evaluation);

                        return toResponse(evaluation);

                        // throw new IllegalStateException(
                        // "Unable to evaluate practice session",
                        // ex);
                }
        }

        // =========================================================
        // GET EVALUATION
        // =========================================================

        @Override
        @Transactional(readOnly = true)
        public SessionEvaluationResponse getEvaluation(UUID conversationId) {

                UUID userId = currentUserProvider.getUserId();

                // =====================================================
                // VERIFY CONVERSATION OWNERSHIP
                // =====================================================

                conversationRepository
                                .findByIdAndUserId(conversationId, userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found"));

                // =====================================================
                // LOAD EVALUATION
                // =====================================================

                SessionEvaluation evaluation = evaluationRepository
                                .findByConversationId(conversationId)
                                .orElseThrow(() -> new ResourceNotFoundException("Evaluation not found"));

                return toResponse(evaluation);
        }

        // =========================================================
        // PARSE AI RESULT
        // =========================================================

        private AiEvaluationResult parseEvaluation(AiResponse response) {

                if (response == null) {

                        throw new IllegalStateException("AI returned no response");
                }

                if (response.content() == null || response.content().isBlank()) {

                        throw new IllegalStateException("AI returned an empty evaluation response");
                }

                String content = response.content().trim();

                if (content.startsWith("```")) {

                        content = content
                                        .replaceFirst("^```(?:json)?\\s*", "")
                                        .replaceFirst("\\s*```$", "")
                                        .trim();
                }

                try {

                        return objectMapper.readValue(content, AiEvaluationResult.class);

                } catch (Exception ex) {

                        log.error(
                                        "Failed to parse AI evaluation response: {}",
                                        content,
                                        ex);

                        throw new IllegalStateException(
                                        "AI returned an invalid evaluation response",
                                        ex);
                }
        }

        // =========================================================
        // VALIDATE RESULT
        // =========================================================

        private void validateResult(AiEvaluationResult result) {

                if (result == null) {

                        throw new IllegalStateException("AI returned an empty evaluation result");
                }

                validateScore(
                                result.overallScore(),
                                "overallScore");

                validateScore(
                                result.communicationScore(),
                                "communicationScore");

                validateScore(
                                result.clarityScore(),
                                "clarityScore");

                validateScore(
                                result.confidenceScore(),
                                "confidenceScore");

                validateScore(
                                result.relevanceScore(),
                                "relevanceScore");

                if (result.strengths() == null) {

                        throw new IllegalArgumentException(
                                        "Evaluation strengths cannot be null");
                }

                if (result.improvements() == null) {

                        throw new IllegalArgumentException(
                                        "Evaluation improvements cannot be null");
                }

                if (result.recommendation() == null ||
                                result.recommendation().isBlank()) {

                        throw new IllegalArgumentException(
                                        "Evaluation recommendation cannot be empty");
                }

                if (result.evaluatorFeedback() == null ||
                                result.evaluatorFeedback().isBlank()) {

                        throw new IllegalArgumentException(
                                        "Evaluator feedback cannot be empty");
                }
        }

        // =========================================================
        // SCORE VALIDATION
        // =========================================================

        private void validateScore(Integer score, String field) {

                if (score == null || score < 0 || score > 100) {

                        throw new IllegalArgumentException(field + " must be between 0 and 100");
                }
        }

        // =========================================================
        // RESPONSE MAPPER
        // =========================================================

        private SessionEvaluationResponse toResponse(SessionEvaluation evaluation) {

                Hibernate.initialize(evaluation.getStrengths());
                Hibernate.initialize(evaluation.getImprovements());

                return new SessionEvaluationResponse(
                                evaluation.getId(),
                                evaluation.getConversation().getId(),
                                evaluation.getStatus(),
                                evaluation.getOverallScore(),
                                evaluation.getCommunicationScore(),
                                evaluation.getClarityScore(),
                                evaluation.getConfidenceScore(),
                                evaluation.getRelevanceScore(),
                                List.copyOf(evaluation.getStrengths()),
                                List.copyOf(evaluation.getImprovements()),
                                evaluation.getRecommendation(),
                                evaluation.getEvaluatorFeedback(),
                                evaluation.getCreatedAt(),
                                evaluation.getCompletedAt());
        }
}