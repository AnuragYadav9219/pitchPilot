package com.virtualmentor.evaluation.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.virtualmentor.evaluation.enums.EvaluationStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interview_evaluations", indexes = {
        @Index(name = "idx_evaluation_interview_id", columnList = "interview_id"),
        @Index(name = "idx_evaluation_user_id", columnList = "user_id"),
        @Index(name = "idx_evaluation_user_status_completed", columnList = "user_id,status,completed_at")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "interview_id", nullable = false, unique = true)
    private Long interviewId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EvaluationStatus status;

    @Column(name = "overall_score")
    private Double overallScore;

    @Column(name = "technical_score")
    private Double technicalScore;

    @Column(name = "communication_score")
    private Double communicationScore;

    @Column(name = "problem_solving_score")
    private Double problemSolvingScore;

    @Column(name = "confidence_score")
    private Double confidenceScore;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "strengths", columnDefinition = "TEXT")
    private String strengths;

    @Column(name = "areas_to_improve", columnDefinition = "TEXT")
    private String areasToImprove;

    @Column(name = "recommendations", columnDefinition = "TEXT")
    private String recommendations;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();

        if (status == null) {
            status = EvaluationStatus.PENDING;
        }
    }
}