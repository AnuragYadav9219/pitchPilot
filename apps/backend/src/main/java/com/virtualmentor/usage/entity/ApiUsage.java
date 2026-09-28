package com.virtualmentor.usage.entity;

import com.virtualmentor.usage.enums.UsageType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "api_usage", indexes = {

        @Index(name = "idx_usage_user_id", columnList = "user_id"),

        @Index(name = "idx_usage_interview_id", columnList = "interview_id"),

        @Index(name = "idx_usage_provider", columnList = "provider"),

        @Index(name = "idx_usage_created_at", columnList = "created_at"),

        @Index(name = "idx_usage_user_created", columnList = "user_id,created_at"),

        @Index(name = "idx_usage_interview_type", columnList = "interview_id,usage_type")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "interview_id")
    private Long interviewId;

    @Column(nullable = false, length = 50)
    private String provider;

    @Enumerated(EnumType.STRING)
    @Column(name = "usage_type", nullable = false, length = 30)
    private UsageType usageType;

    private Long inputTokens;

    private Long outputTokens;

    private Long totalTokens;

    private Long audioDurationMs;

    @Column(length = 100)
    private String model;

    @Column(length = 255)
    private String providerRequestId;

    private Double estimatedCost;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}