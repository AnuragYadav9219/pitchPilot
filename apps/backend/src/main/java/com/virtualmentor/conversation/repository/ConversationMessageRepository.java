package com.virtualmentor.conversation.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.conversation.entity.ConversationMessage;

public interface ConversationMessageRepository
        extends JpaRepository<ConversationMessage, UUID> {

    List<ConversationMessage> findByInterviewIdAndUserIdAndDeletedFalseOrderBySequenceNumberAsc(
            Long interviewId,
            UUID userId);

    long countByInterviewIdAndUserIdAndDeletedFalse(
            Long interviewId,
            UUID userId);

    boolean existsByInterviewIdAndUserIdAndSequenceNumber(
            Long interviewId,
            UUID userId,
            Integer sequenceNumber);
}