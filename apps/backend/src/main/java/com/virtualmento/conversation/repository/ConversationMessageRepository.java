package com.virtualmento.conversation.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmento.conversation.entity.ConversationMessage;

public interface ConversationMessageRepository extends JpaRepository<ConversationMessage, UUID> {

        List<ConversationMessage> findByConversationIdOrderByCreatedAtAsc(
                        UUID conversationId);

        List<ConversationMessage> findByConversationIdOrderByCreatedAtDesc(
                        UUID conversationId,
                        Pageable pageable);

        Optional<ConversationMessage> findByIdAndConversationId(UUID messageId, UUID conversationId);
}