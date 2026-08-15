package com.virtualmento.conversation.mapper;

import org.springframework.stereotype.Component;

import com.virtualmento.conversation.dto.ConversationResponse;
import com.virtualmento.conversation.dto.MessageResponse;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.ConversationMessage;

@Component
public class ConversationMapper {

    public ConversationResponse toResponse(
            Conversation conversation) {

        return new ConversationResponse(
                conversation.getId(),
                conversation.getTitle(),
                conversation.getType(),
                conversation.getArchived(),
                conversation.getLastMessageAt(),
                conversation.getCreatedAt(),
                conversation.getUpdatedAt());
    }

    public MessageResponse toMessageResponse(
            ConversationMessage message) {

        return new MessageResponse(
                message.getId(),
                message.getRole(),
                message.getContent(),
                message.getModel(),
                message.getCreatedAt());
    }
}