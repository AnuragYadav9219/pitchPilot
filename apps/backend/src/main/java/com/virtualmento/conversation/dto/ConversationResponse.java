package com.virtualmento.conversation.dto;

import java.time.Instant;
import java.util.UUID;

import com.virtualmento.conversation.entity.ConversationType;

public record ConversationResponse(

        UUID id,

        String title,

        ConversationType type,

        Boolean archived,

        Instant lastMessageAt,

        Instant createdAt,

        Instant updatedAt

) {
}