package com.virtualmentor.evaluation.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.common.exception.ResourceNotFoundException;
import com.virtualmentor.conversation.entity.ConversationMessage;
import com.virtualmentor.conversation.enums.MessageRole;
import com.virtualmentor.conversation.repository.ConversationMessageRepository;
import com.virtualmentor.evaluation.entity.EvaluationQuestionResult;
import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.enums.EvaluationStatus;
import com.virtualmentor.evaluation.provider.EvaluationProvider;
import com.virtualmentor.evaluation.provider.model.EvaluationResult;
import com.virtualmentor.evaluation.provider.model.QuestionEvaluation;
import com.virtualmentor.evaluation.repository.EvaluationQuestionResultRepository;
import com.virtualmentor.evaluation.repository.InterviewEvaluationRepository;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EvaluationServiceImpl implements EvaluationService {

    private final InterviewRepository interviewRepository;
    private final ConversationMessageRepository conversationMessageRepository;
    private final InterviewEvaluationRepository evaluationRepository;
    private final EvaluationQuestionResultRepository questionResultRepository;
    private final EvaluationProvider evaluationProvider;
    private final EvaluationFailureService evaluationFailureService;

    @Override
    @Transactional
    public InterviewEvaluation evaluate(Long interviewId, UUID userId) {

        Interview interview = interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        if (interview.getStatus() != InterviewStatus.COMPLETED) {
            throw new IllegalStateException("Interview must be completed before evaluation");
        }

        // ============================================================
        // 3. Load conversation
        // ============================================================

        List<ConversationMessage> messages = conversationMessageRepository
                .findByInterviewIdAndUserIdAndDeletedFalseOrderBySequenceNumberAsc(interviewId, userId);

        if (messages.isEmpty()) {
            throw new IllegalStateException("No conversation found for evaluation");
        }

        // ============================================================
        // 4. Validate conversation
        // ============================================================

        long userMessageCount = messages.stream()
                .filter(message -> message.getRole() == MessageRole.USER)
                .count();

        long assistantMessageCount = messages.stream()
                .filter(message -> message.getRole() == MessageRole.ASSISTANT)
                .count();

        if (userMessageCount == 0) {
            throw new IllegalStateException("No user responses found for evaluation");
        }

        if (assistantMessageCount == 0) {
            throw new IllegalStateException("No interviewer messages found for evaluation");
        }

        // ============================================================
        // 5. Get existing evaluation or create a new one
        // ============================================================

        InterviewEvaluation evaluation = evaluationRepository
                .findByInterviewIdAndUserId(interviewId, userId)
                .orElseGet(() -> InterviewEvaluation.builder()
                        .interviewId(interviewId)
                        .userId(userId)
                        .status(EvaluationStatus.PENDING)
                        .build());

        if (evaluation.getStatus() == EvaluationStatus.COMPLETED) {
            return evaluation;
        }

        evaluation.setStatus(EvaluationStatus.EVALUATING);
        evaluation.setCompletedAt(null);

        InterviewEvaluation savedEvaluation = evaluationRepository.save(evaluation);

        try {

            EvaluationResult result = evaluationProvider.evaluate(interview, messages);

            savedEvaluation.setOverallScore(result.overallScore());
            savedEvaluation.setTechnicalScore(result.technicalScore());
            savedEvaluation.setCommunicationScore(result.communicationScore());
            savedEvaluation.setProblemSolvingScore(result.problemSolvingScore());
            savedEvaluation.setConfidenceScore(result.confidenceScore());
            savedEvaluation.setSummary(result.summary());
            savedEvaluation.setStrengths(joinLines(result.strengths()));
            savedEvaluation.setAreasToImprove(joinLines(result.areasToImprove()));
            savedEvaluation.setRecommendations(joinLines(result.recommendations()));
            savedEvaluation.setStatus(EvaluationStatus.COMPLETED);
            savedEvaluation.setCompletedAt(LocalDateTime.now());
            savedEvaluation = evaluationRepository.save(savedEvaluation);

            saveQuestionResults(savedEvaluation, result.questions());

            return savedEvaluation;

        } catch (Exception e) {

            log.error(
                    "Evaluation failed for interviewId={}, userId={}",
                    interviewId,
                    userId,
                    e);

            evaluationFailureService.markFailed(
                    interviewId,
                    userId);

            throw e;
        }
    }

    // ================================================================
    // GET EVALUATION
    // ================================================================

    @Override
    @Transactional(readOnly = true)
    public InterviewEvaluation getEvaluation(
            Long interviewId,
            UUID userId) {

        interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        return evaluationRepository
                .findByInterviewIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Evaluation not found"));
    }

    private void saveQuestionResults(
            InterviewEvaluation evaluation,
            List<QuestionEvaluation> results) {

        questionResultRepository
                .deleteByEvaluationId(evaluation.getId());

        if (results == null || results.isEmpty()) {
            return;
        }

        List<EvaluationQuestionResult> entities = results.stream()
                .map(result -> EvaluationQuestionResult.builder()
                        .evaluationId(evaluation.getId())
                        .questionNumber(result.questionNumber())
                        .question(result.question())
                        .userAnswer(result.userAnswer())
                        .score(result.score())
                        .feedback(result.feedback())
                        .build())
                .toList();

        questionResultRepository.saveAll(entities);
    }

    // ================================================================
    // HELPERS
    // ================================================================

    private String joinLines(List<String> values) {

        if (values == null || values.isEmpty()) {
            return "";
        }

        return values.stream()
                .filter(value -> value != null && !value.isBlank())
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .reduce((a, b) -> a + "\n" + b)
                .orElse("");
    }
}