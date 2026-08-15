package com.virtualmento.conversation.entity;

import java.time.Instant;
import java.util.UUID;

import com.virtualmento.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversation_messages")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MessageRole role;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private MessageStatus status = MessageStatus.COMPLETED;

    @Column(length = 50)
    private String provider;

    @Column(length = 100)
    private String model;

    private Integer inputTokens;

    private Integer outputTokens;

    private Integer totalTokens;

    private Long latencyMs;

    @Column(columnDefinition = "TEXT")
    private String errorCode;

    @Column(length = 200)
    private String providerRequestId;

    private Instant completedAt;

    public void markCompleted() {
        this.status = MessageStatus.COMPLETED;
        this.completedAt = Instant.now();
    }

    public void markFailed(String errorCode) {
        this.status = MessageStatus.FAILED;
        this.errorCode = errorCode;
        this.completedAt = Instant.now();
    }

    public void markProcessing() {
        this.status = MessageStatus.PROCESSING;
    }
}