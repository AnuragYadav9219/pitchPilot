package com.virtualmentor.conversation.dto;

import java.time.Instant;
import java.util.UUID;

import com.virtualmentor.conversation.entity.MessageRole;

public record MessageResponse(

                UUID id,

                MessageRole role,

                String content,

                String model,

                Instant createdAt

) {
}