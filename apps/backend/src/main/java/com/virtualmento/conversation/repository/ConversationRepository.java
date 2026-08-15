package com.virtualmento.conversation.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmento.conversation.entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, UUID> {

    Optional<Conversation> findByIdAndUserId(UUID conversationId, UUID userId);

    List<Conversation> findByUserIdAndArchivedFalseOrderByLastMessageAtDesc(UUID userId);
}
