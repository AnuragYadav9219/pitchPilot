package com.virtualmentor.resume.entity;

import com.virtualmentor.resume.enums.ResumeStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "resumes", indexes = {

        @Index(name = "idx_resume_user_id", columnList = "user_id"),

        @Index(name = "idx_resume_status", columnList = "status"),

        @Index(name = "idx_resume_user_status", columnList = "user_id,status"),

        @Index(name = "idx_resume_user_created", columnList = "user_id,created_at")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 255)
    private String fileName;

    @Column(nullable = false, length = 500)
    private String storageKey;

    @Column(length = 100)
    private String contentType;

    private Long fileSize;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ResumeStatus status;

    @Lob
    private String extractedText;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (status == null) {
            status = ResumeStatus.UPLOADED;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}