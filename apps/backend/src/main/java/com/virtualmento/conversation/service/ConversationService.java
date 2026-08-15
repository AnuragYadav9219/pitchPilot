package com.virtualmento.conversation.service;

import java.util.List;
import java.util.UUID;

import com.virtualmento.conversation.dto.ConversationDetailResponse;
import com.virtualmento.conversation.dto.ConversationResponse;
import com.virtualmento.conversation.dto.CreateConversationRequest;
import com.virtualmento.conversation.dto.MessageResponse;
import com.virtualmento.conversation.dto.SendMessageRequest;

public interface ConversationService {

    ConversationResponse create(CreateConversationRequest request);

    List<ConversationResponse> getMyConversations();

    ConversationDetailResponse getConversation(UUID conversationId);

    MessageResponse sendResponse(
            UUID conversationId,
            SendMessageRequest request);

    void archive(UUID conversationId);
}
