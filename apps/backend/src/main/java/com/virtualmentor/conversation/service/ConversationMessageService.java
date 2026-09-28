package com.virtualmentor.conversation.service;

import java.util.List;
import java.util.UUID;

import com.virtualmentor.conversation.dto.ConversationMessageResponse;
import com.virtualmentor.conversation.dto.SaveConversationMessageRequest;

public interface ConversationMessageService {

    ConversationMessageResponse saveMessage(
            Long interviewId,
            UUID userId,
            SaveConversationMessageRequest request);

    List<ConversationMessageResponse> getMessages(
            Long interviewId,
            UUID userId);
}