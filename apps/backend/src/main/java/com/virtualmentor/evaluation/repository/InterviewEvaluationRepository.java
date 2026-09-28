package com.virtualmentor.evaluation.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.enums.EvaluationStatus;

public interface InterviewEvaluationRepository extends JpaRepository<InterviewEvaluation, UUID> {

        Optional<InterviewEvaluation> findByInterviewIdAndUserId(Long interviewId, UUID userId);

        List<InterviewEvaluation> findByUserIdAndInterviewIdIn(
                        UUID userId,
                        Collection<Long> interviewIds);

        boolean existsByInterviewId(Long interviewId);

        List<InterviewEvaluation> findByUserIdAndStatusOrderByCompletedAtDesc(UUID userId, EvaluationStatus status);
}