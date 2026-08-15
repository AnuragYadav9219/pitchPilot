package com.virtualmento.conversation.entity;

import java.time.Instant;
import java.util.UUID;

import com.virtualmento.common.entity.BaseEntity;
import com.virtualmento.user.entity.User;

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
@Table(name = "conversations")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Conversation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 200)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ConversationType type;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(nullable = false)
    @Builder.Default
    private Integer summarizedMessageCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean archived = false;

    private Instant lastMessageAt;
}