package com.virtualmento.conversation.dto;

import com.virtualmento.conversation.entity.ConversationType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateConversationRequest(

        @NotNull(message = "Conversation type is required") 
        ConversationType type,

        @Size(max = 200, message = "Title cannot exceed 200 characters") 
        String title

) {
}