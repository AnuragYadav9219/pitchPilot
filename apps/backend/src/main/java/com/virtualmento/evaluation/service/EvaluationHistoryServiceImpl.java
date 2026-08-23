package com.virtualmento.evaluation.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.evaluation.dto.EvaluationPageResponse;
import com.virtualmento.evaluation.dto.EvaluationSummaryResponse;
import com.virtualmento.evaluation.entity.EvaluationStatus;
import com.virtualmento.evaluation.entity.SessionEvaluation;
import com.virtualmento.evaluation.repository.SessionEvaluationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationHistoryServiceImpl implements EvaluationHistoryService {

        private final SessionEvaluationRepository evaluationRepository;
        private final CurrentUserProvider currentUserProvider;

        @Override
        @Transactional(readOnly = true)
        public EvaluationPageResponse getMyEvaluations(
                        int page,
                        int size) {

                UUID userId = currentUserProvider.getUserId();

                /*
                 * Protect the API from unreasonable
                 * pagination requests.
                 */
                int safePage = Math.max(page, 0);
                int safeSize = Math.min(
                                Math.max(size, 1),
                                20);

                Pageable pageable = PageRequest.of(
                                safePage,
                                safeSize);

                List<SessionEvaluation> evaluations = evaluationRepository
                                .findRecentEvaluations(
                                                userId,
                                                EvaluationStatus.COMPLETED,
                                                pageable);

                long totalElements = evaluationRepository
                                .countByConversationUserIdAndStatus(
                                                userId,
                                                EvaluationStatus.COMPLETED);

                int totalPages = totalElements == 0
                                ? 0
                                : (int) Math.ceil(
                                                (double) totalElements
                                                                / safeSize);

                List<EvaluationSummaryResponse> content = evaluations.stream()
                                .map(this::toSummary)
                                .toList();

                return new EvaluationPageResponse(
                                content,
                                safePage,
                                safeSize,
                                totalElements,
                                totalPages,
                                safePage == 0,
                                totalPages == 0 || safePage >= totalPages - 1);
        }

        private EvaluationSummaryResponse toSummary(SessionEvaluation evaluation) {

                var conversation = evaluation.getConversation();

                return new EvaluationSummaryResponse(
                                conversation.getId(),
                                conversation.getTitle(),
                                conversation.getType().name(),
                                evaluation.getOverallScore(),
                                evaluation.getCommunicationScore(),
                                evaluation.getClarityScore(),
                                evaluation.getConfidenceScore(),
                                evaluation.getRelevanceScore(),
                                evaluation.getCompletedAt());
        }
}