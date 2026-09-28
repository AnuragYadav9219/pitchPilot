package com.virtualmentor.conversation.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import com.virtualmentor.conversation.enums.MessageRole;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversation_messages", indexes = {
        @Index(name = "idx_conversation_message_interview_id", columnList = "interview_id"),
        @Index(name = "idx_conversation_message_user_id", columnList = "user_id"),
        @Index(name = "idx_conversation_message_interview_created", columnList = "interview_id, created_at")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /**
     * Interview to which this message belongs.
     */
    @Column(name = "interview_id", nullable = false)
    private Long interviewId;

    /**
     * Owner of the interview.
     *
     * Stored explicitly so that authorization does not
     * require trusting the frontend.
     */
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    /**
     * USER or ASSISTANT.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MessageRole role;

    /**
     * Actual persisted transcript.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    /**
     * Position of the message inside the interview.
     *
     * 0, 1, 2, 3...
     */
    @Column(nullable = false)
    private Integer sequenceNumber;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Builder.Default
    @Column(nullable = false)
    private Boolean deleted = false;

    @jakarta.persistence.PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (deleted == null) {
            deleted = false;
        }
    }

    @jakarta.persistence.PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}