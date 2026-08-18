package com.virtualmento.evaluation.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.evaluation.entity.EvaluationStatus;
import com.virtualmento.evaluation.entity.SessionEvaluation;

public interface SessionEvaluationRepository
    extends JpaRepository<SessionEvaluation, UUID> {

  Optional<SessionEvaluation> findByConversationId(UUID conversationId);

  boolean existsByConversationId(UUID conversationId);

  // =========================================================
  // TOTAL EVALUATIONS
  // =========================================================

  long countByConversationUserId(UUID userId);

  // =========================================================
  // COMPLETED EVALUATIONS
  // =========================================================

  long countByConversationUserIdAndStatus(
      UUID userId,
      EvaluationStatus status);

  // =========================================================
  // AVERAGE OVERALL SCORE
  // =========================================================

  @Query("""
      SELECT AVG(e.overallScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Double findAverageScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // BEST SCORE
  // =========================================================

  @Query("""
      SELECT MAX(e.overallScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Integer findBestScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // COMMUNICATION
  // =========================================================

  @Query("""
      SELECT AVG(e.communicationScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Double findAverageCommunicationScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // CLARITY
  // =========================================================

  @Query("""
      SELECT AVG(e.clarityScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Double findAverageClarityScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // CONFIDENCE
  // =========================================================

  @Query("""
      SELECT AVG(e.confidenceScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Double findAverageConfidenceScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // RELEVANCE
  // =========================================================

  @Query("""
      SELECT AVG(e.relevanceScore)
      FROM SessionEvaluation e
      WHERE e.conversation.user.id = :userId
        AND e.status = :status
      """)
  Double findAverageRelevanceScore(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);

  // =========================================================
  // RECENT EVALUATIONS
  // =========================================================

  @Query("""
      SELECT e
      FROM SessionEvaluation e
      JOIN FETCH e.conversation c
      WHERE c.user.id = :userId
        AND e.status = :status
      ORDER BY e.completedAt DESC
      """)
  List<SessionEvaluation> findRecentEvaluations(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status,
      Pageable pageable);

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

  @Query("""
      SELECT e
      FROM SessionEvaluation e
      JOIN FETCH e.conversation c
      WHERE c.user.id = :userId
        AND e.status = :status
      ORDER BY e.completedAt ASC
      """)
  List<SessionEvaluation> findCompletedEvaluations(
      @Param("userId") UUID userId,
      @Param("status") EvaluationStatus status);
}