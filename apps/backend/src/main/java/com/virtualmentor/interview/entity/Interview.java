package com.virtualmentor.interview.entity;

import com.virtualmentor.interview.enums.InterviewDifficulty;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.enums.InterviewType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "interviews", indexes = {

        @Index(name = "idx_interview_user_id", columnList = "user_id"),
        @Index(name = "idx_interview_status", columnList = "status"),
        @Index(name = "idx_interview_created_at", columnList = "created_at"),
        @Index(name = "idx_interview_credit_reference", columnList = "credit_reference"),
        @Index(name = "idx_interview_user_status", columnList = "user_id,status"),
        @Index(name = "idx_interview_user_created", columnList = "user_id,created_at"),
        @Index(name = "idx_interview_provider_session", columnList = "provider_session_id"),
        @Index(name = "idx_interview_user_status_completed", columnList = "user_id,status,completed_at")

})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private InterviewType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InterviewDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private InterviewStatus status;

    @Column(nullable = false, length = 150)
    private String role;

    @Column(length = 2000)
    private String topics;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "voice_provider", length = 50)
    private String voiceProvider;

    @Column(name = "provider_session_id", length = 500)
    private String providerSessionId;

    @Column(name = "credit_reference", length = 150)
    private UUID creditReference;

    @Column(name = "billing_reference_id", nullable = false, unique = true)
    @Builder.Default
    private UUID billingReferenceId = UUID.randomUUID();

    private LocalDateTime startedAt;

    private LocalDateTime completedAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (status == null) {
            status = InterviewStatus.CREATED;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}