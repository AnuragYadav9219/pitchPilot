package com.virtualmentor.conversation.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.virtualmentor.conversation.enums.MessageRole;

public record ConversationMessageResponse(

        UUID id,

        Long interviewId,

        MessageRole role,

        String content,

        Integer sequenceNumber,

        LocalDateTime createdAt

) {
}