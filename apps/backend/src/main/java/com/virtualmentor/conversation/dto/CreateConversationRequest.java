package com.virtualmentor.conversation.dto;

import com.virtualmentor.conversation.entity.ConversationType;
import com.virtualmentor.conversation.entity.InterviewMode;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateConversationRequest(

                @NotNull(message = "Conversation type is required") 
                ConversationType type,

                @Size(max = 200, message = "Title cannot exceed 200 characters") 
                String title,

                InterviewMode mode

) {
}