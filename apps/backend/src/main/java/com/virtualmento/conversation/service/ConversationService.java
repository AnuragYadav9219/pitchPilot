package com.virtualmento.conversation.service;

import java.util.UUID;

import com.virtualmento.conversation.dto.ConversationDetailResponse;
import com.virtualmento.conversation.dto.ConversationPageResponse;
import com.virtualmento.conversation.dto.ConversationResponse;
import com.virtualmento.conversation.dto.CreateConversationRequest;
import com.virtualmento.conversation.dto.MessageResponse;
import com.virtualmento.conversation.dto.SendMessageRequest;

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
