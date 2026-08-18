package com.virtualmento.recommendation.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.evaluation.entity.EvaluationStatus;
import com.virtualmento.evaluation.entity.SessionEvaluation;

public interface RecommendationRepository {

    @Query("""
            SELECT e
            FROM SessionEvaluation e
            JOIN e.conversation c
            WHERE c.user.id = :userId
              AND e.status = :status
            ORDER BY e.completedAt DESC
            """)
    List<SessionEvaluation> findUserEvaluations(
            @Param("userId") UUID userId,
            @Param("status") EvaluationStatus status);
}
