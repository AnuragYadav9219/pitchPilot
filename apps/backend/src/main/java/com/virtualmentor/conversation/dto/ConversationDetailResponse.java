package com.virtualmentor.conversation.dto;

import java.util.List;

public record ConversationDetailResponse(

                ConversationResponse conversation,

                List<MessageResponse> messages

) {
}