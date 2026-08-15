package com.virtualmento.conversation.service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.provider.AiUsage;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.entity.MessageRole;
import com.virtualmento.conversation.entity.MessageStatus;
import com.virtualmento.conversation.repository.ConversationMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationMessagePersistenceService {

    private final ConversationMessageRepository repository;

    // =========================================================
    // CREATE USER + ASSISTANT MESSAGES
    // =========================================================

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public MessagePair createMessages(
            Conversation conversation,
            String userContent) {

        ConversationMessage userMessage = ConversationMessage.builder()
                .conversation(conversation)
                .role(MessageRole.USER)
                .content(userContent)
                .status(MessageStatus.COMPLETED)
                .build();

        repository.save(
                userMessage);

        ConversationMessage assistantMessage = ConversationMessage.builder()
                .conversation(conversation)
                .role(MessageRole.ASSISTANT)
                .content("")
                .status(MessageStatus.PROCESSING)
                .build();

        repository.save(
                assistantMessage);

        return new MessagePair(
                userMessage,
                assistantMessage);
    }

    // =========================================================
    // MARK COMPLETED
    // =========================================================

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public ConversationMessage markCompleted(
            UUID messageId,
            AiResponse aiResponse,
            long latencyMs) {

        ConversationMessage message = repository.findById(messageId)
                .orElseThrow(() -> new IllegalStateException(
                        "Assistant message not found"));

        AiUsage usage = aiResponse.usage();

        message.setContent(
                aiResponse.content());

        message.setStatus(
                MessageStatus.COMPLETED);

        message.setProvider(
                aiResponse.provider() != null
                        ? aiResponse.provider().name()
                        : null);

        message.setModel(
                aiResponse.model());

        message.setProviderRequestId(
                aiResponse.providerRequestId());

        message.setLatencyMs(
                latencyMs);

        message.setInputTokens(
                usage != null
                        ? usage.inputTokens()
                        : null);

        message.setOutputTokens(
                usage != null
                        ? usage.outputTokens()
                        : null);

        message.setTotalTokens(
                usage != null
                        ? usage.totalTokens()
                        : null);

        message.markCompleted();

        return repository.save(
                message);
    }

    // =========================================================
    // MARK FAILED
    // =========================================================

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void markFailed(
            UUID messageId,
            String errorCode) {

        ConversationMessage message = repository.findById(messageId)
                .orElseThrow(() -> new IllegalStateException(
                        "Assistant message not found"));

        message.setStatus(
                MessageStatus.FAILED);

        message.setErrorCode(
                errorCode);

        message.setCompletedAt(
                Instant.now());

        repository.save(
                message);
    }

    // =========================================================
    // MESSAGE PAIR
    // =========================================================

    public record MessagePair(
            ConversationMessage userMessage,
            ConversationMessage assistantMessage) {
    }
}