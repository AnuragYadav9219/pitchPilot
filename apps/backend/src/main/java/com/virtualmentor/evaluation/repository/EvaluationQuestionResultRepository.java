package com.virtualmentor.evaluation.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.evaluation.entity.EvaluationQuestionResult;

public interface EvaluationQuestionResultRepository
        extends JpaRepository<EvaluationQuestionResult, UUID> {

    List<EvaluationQuestionResult> findByEvaluationIdOrderByQuestionNumberAsc(UUID evaluationId);

    void deleteByEvaluationId(UUID evaluationId);
}