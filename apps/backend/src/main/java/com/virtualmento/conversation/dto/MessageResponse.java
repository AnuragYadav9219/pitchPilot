package com.virtualmento.conversation.dto;

import java.time.Instant;
import java.util.UUID;

import com.virtualmento.conversation.entity.MessageRole;

public record MessageResponse(

        UUID id,

        MessageRole role,

        String content,

        String model,

        Instant createdAt

) {
}