package com.virtualmentor.history.service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.repository.InterviewEvaluationRepository;
import com.virtualmentor.history.dto.HistoryItemResponse;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HistoryServiceImpl implements HistoryService {

        private final InterviewRepository interviewRepository;
        private final InterviewEvaluationRepository evaluationRepository;

        @Override
        @Transactional(readOnly = true)
        public Page<HistoryItemResponse> getHistory(UUID userId, Pageable pageable) {

                Page<Interview> interviews = interviewRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

                if (interviews.isEmpty()) {
                        return Page.empty(pageable);
                }

                List<Long> interviewIds = interviews
                                .getContent()
                                .stream()
                                .map(Interview::getId)
                                .toList();

                List<InterviewEvaluation> evaluations = evaluationRepository.findByUserIdAndInterviewIdIn(userId,
                                interviewIds);

                Map<Long, InterviewEvaluation> evaluationMap = evaluations.stream()
                                .collect(Collectors.toMap(
                                                InterviewEvaluation::getInterviewId,
                                                Function.identity()));

                return interviews.map(interview -> {

                        InterviewEvaluation evaluation = evaluationMap.get(interview.getId());

                        return new HistoryItemResponse(
                                        interview.getId(),
                                        interview.getRole(),
                                        interview.getTopics(),
                                        interview.getType(),
                                        interview.getDifficulty(),
                                        interview.getStatus(),

                                        evaluation != null
                                                        ? evaluation.getOverallScore()
                                                        : null,

                                        evaluation != null
                                                        ? evaluation.getStatus()
                                                        : null,

                                        interview.getDurationMinutes(),
                                        interview.getStartedAt(),
                                        interview.getCompletedAt(),
                                        interview.getCreatedAt());
                });
        }
}