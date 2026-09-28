package com.virtualmentor.evaluation.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "evaluation_question_results", indexes = {
        @Index(name = "idx_eval_question_evaluation_id", columnList = "evaluation_id")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationQuestionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "evaluation_id", nullable = false)
    private UUID evaluationId;

    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;

    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;

    @Column(name = "user_answer", columnDefinition = "TEXT")
    private String userAnswer;

    @Column
    private Double score;

    @Column(name = "feedback", columnDefinition = "TEXT")
    private String feedback;
}