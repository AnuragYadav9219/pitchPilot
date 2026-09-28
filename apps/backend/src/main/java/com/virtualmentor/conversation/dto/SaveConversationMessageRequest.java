package com.virtualmentor.conversation.dto;

import com.virtualmentor.conversation.enums.MessageRole;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SaveConversationMessageRequest(

        @NotNull MessageRole role,

        @NotBlank @Size(max = 10000) String content

) {
}