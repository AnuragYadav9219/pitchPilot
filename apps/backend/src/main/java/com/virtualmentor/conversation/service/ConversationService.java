package com.virtualmentor.conversation.service;

import java.util.UUID;

import com.virtualmentor.conversation.dto.ConversationDetailResponse;
import com.virtualmentor.conversation.dto.ConversationPageResponse;
import com.virtualmentor.conversation.dto.ConversationResponse;
import com.virtualmentor.conversation.dto.CreateConversationRequest;
import com.virtualmentor.conversation.dto.MessageResponse;
import com.virtualmentor.conversation.dto.SendMessageRequest;

public interface ConversationService {

    ConversationResponse create(CreateConversationRequest request);

    ConversationPageResponse getMyConversations(int page, int size);

    ConversationDetailResponse getConversation(UUID conversationId);

    MessageResponse sendResponse(
            UUID conversationId,
            SendMessageRequest request);

    void archive(UUID conversationId);

    void permanentlyDelete(UUID conversationId);
}
