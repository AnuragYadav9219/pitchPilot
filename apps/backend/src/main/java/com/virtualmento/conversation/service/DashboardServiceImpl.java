package com.virtualmento.conversation.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.conversation.dto.DashboardResponse;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.EvaluationStatus;
import com.virtualmento.conversation.entity.SessionEvaluation;
import com.virtualmento.conversation.repository.SessionEvaluationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private static final int RECENT_SESSION_LIMIT = 5;

    private final SessionEvaluationRepository evaluationRepository;
    private final CurrentUserProvider currentUserProvider;

    @Override
    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {

        UUID userId = currentUserProvider.getUserId();

        EvaluationStatus completed = EvaluationStatus.COMPLETED;

        long totalSessions = evaluationRepository
                .countByConversationUserId(userId);

        long completedSessions = evaluationRepository
                .countByConversationUserIdAndStatus(
                        userId,
                        completed);

        Integer averageScore = round(evaluationRepository
                .findAverageScore(
                        userId,
                        completed));

        Integer bestScore = evaluationRepository
                .findBestScore(
                        userId,
                        completed);

        Integer averageCommunicationScore = round(evaluationRepository
                .findAverageCommunicationScore(
                        userId,
                        completed));

        Integer averageClarityScore = round(evaluationRepository
                .findAverageClarityScore(
                        userId,
                        completed));

        Integer averageConfidenceScore = round(evaluationRepository
                .findAverageConfidenceScore(
                        userId,
                        completed));

        Integer averageRelevanceScore = round(evaluationRepository
                .findAverageRelevanceScore(
                        userId,
                        completed));

        List<SessionEvaluation> evaluations = evaluationRepository.findRecentEvaluations(
                userId,
                completed,
                PageRequest.of(
                        0,
                        RECENT_SESSION_LIMIT));

        List<DashboardResponse.RecentSession> recentSessions = evaluations
                .stream()
                .map(this::toRecentSession)
                .toList();

        return new DashboardResponse(
                totalSessions,
                completedSessions,
                averageScore,
                bestScore,
                averageCommunicationScore,
                averageClarityScore,
                averageConfidenceScore,
                averageRelevanceScore,
                recentSessions);
    }

    private DashboardResponse.RecentSession toRecentSession(SessionEvaluation evaluation) {

        Conversation conversation = evaluation.getConversation();

        return new DashboardResponse.RecentSession(
                conversation.getId(),
                conversation.getTitle(),
                conversation.getType().name(),
                evaluation.getOverallScore(),
                evaluation.getCompletedAt());
    }

    private Integer round(Double value) {

        if (value == null) {
            return null;
        }

        return (int) Math.round(value);
    }
}