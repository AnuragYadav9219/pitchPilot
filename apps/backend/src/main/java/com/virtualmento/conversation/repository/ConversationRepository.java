package com.virtualmento.conversation.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.conversation.entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    Optional<Conversation> findByIdAndUserId(UUID conversationId, UUID userId);

    Page<Conversation> findByUserIdAndArchivedFalseOrderByLastMessageAtDesc(
            UUID userId,
            Pageable pageable);

    @Query("""
            SELECT c
            FROM Conversation c
            WHERE c.user.id = :userId
            AND EXISTS (
                SELECT 1
                FROM ConversationMessage m
                WHERE m.conversation.id = c.id
            )
            ORDER BY COALESCE(c.lastMessageAt, c.createdAt) DESC
            """)
    Page<Conversation> findUserConversationsWithMessages(
            @Param("userId") UUID userId,
            Pageable pageable);
}
