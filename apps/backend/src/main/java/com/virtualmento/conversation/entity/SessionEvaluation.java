package com.virtualmento.conversation.entity;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.virtualmento.common.entity.BaseEntity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "session_evaluations")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SessionEvaluation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false, unique = true)
    private Conversation conversation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private EvaluationStatus status;

    @Column
    private Integer overallScore;

    @Column
    private Integer communicationScore;

    @Column
    private Integer clarityScore;

    @Column
    private Integer confidenceScore;

    @Column
    private Integer relevanceScore;

    @ElementCollection
    @CollectionTable(name = "session_evaluation_strengths", joinColumns = @JoinColumn(name = "evaluation_id"))
    @Column(name = "strength")
    private List<String> strengths;

    @ElementCollection
    @CollectionTable(name = "session_evaluation_improvements", joinColumns = @JoinColumn(name = "evaluation_id"))
    @Column(name = "improvement")
    private java.util.List<String> improvements;

    @Column(columnDefinition = "TEXT")
    private String recommendation;

    @Column(columnDefinition = "TEXT")
    private String evaluatorFeedback;

    @Column(nullable = false)
    private Instant createdAt;

    private Instant completedAt;
}
