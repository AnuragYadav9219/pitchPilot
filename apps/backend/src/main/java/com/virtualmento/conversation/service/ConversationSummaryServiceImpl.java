package com.virtualmento.conversation.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.ai.config.AiProperties;
import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.service.AiService;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.repository.ConversationMessageRepository;
import com.virtualmento.conversation.repository.ConversationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConversationSummaryServiceImpl
        implements ConversationSummaryService {

    private final ConversationMessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final AiService aiService;
    private final AiProperties aiProperties;

    // =========================================================
    // UPDATE SUMMARY
    // =========================================================

    @Override
    @Transactional
    public void updateSummary(
            Conversation conversation) {

        if (conversation == null ||
                conversation.getId() == null) {
            return;
        }

        // -----------------------------------------------------
        // Load all messages in chronological order
        // -----------------------------------------------------

        List<ConversationMessage> messages = messageRepository
                .findByConversationIdOrderByCreatedAtAsc(conversation.getId());

        if (messages.isEmpty()) {
            return;
        }

        // -----------------------------------------------------
        // Configuration
        // -----------------------------------------------------

        int summaryThreshold = aiProperties
                .getMemory()
                .getSummaryThreshold();

        int recentMessageCount = aiProperties
                .getContext()
                .getRecentMessageCount();

        // -----------------------------------------------------
        // Don't summarize too early
        // -----------------------------------------------------

        if (messages.size() <= summaryThreshold) {
            return;
        }

        // -----------------------------------------------------
        // Keep recent messages outside the summary
        // -----------------------------------------------------

        if (messages.size() <= recentMessageCount) {
            return;
        }

        int summaryEndIndex = messages.size() - recentMessageCount;

        // -----------------------------------------------------
        // How many messages have already been summarized?
        // -----------------------------------------------------

        int summarizedMessageCount = conversation.getSummarizedMessageCount() == null
                ? 0
                : conversation.getSummarizedMessageCount();

        // -----------------------------------------------------
        // Safety check
        // -----------------------------------------------------

        if (summarizedMessageCount < 0) {
            summarizedMessageCount = 0;
        }

        if (summarizedMessageCount > summaryEndIndex) {
            summarizedMessageCount = summaryEndIndex;
        }

        // -----------------------------------------------------
        // Nothing new to summarize
        // -----------------------------------------------------

        if (summaryEndIndex <= summarizedMessageCount) {
            return;
        }

        // -----------------------------------------------------
        // Get ONLY messages not yet included in summary
        // -----------------------------------------------------

        List<ConversationMessage> messagesToSummarize = messages.subList(
                summarizedMessageCount,
                summaryEndIndex);

        if (messagesToSummarize.isEmpty()) {
            return;
        }

        // -----------------------------------------------------
        // Generate updated summary
        // -----------------------------------------------------

        String newSummary = generateSummary(
                conversation.getSummary(),
                messagesToSummarize);

        if (newSummary == null ||
                newSummary.isBlank()) {

            log.warn(
                    "AI returned empty summary for conversation {}",
                    conversation.getId());

            return;
        }

        // -----------------------------------------------------
        // Save summary
        // -----------------------------------------------------

        conversation.setSummary(
                newSummary.trim());

        /*
         * Mark these messages as incorporated into the
         * long-term memory.
         */
        conversation.setSummarizedMessageCount(
                summaryEndIndex);

        conversationRepository.save(
                conversation);

        log.debug(
                "Conversation {} memory updated. " + "Messages summarized: {} -> {}",
                conversation.getId(),
                summarizedMessageCount,
                summaryEndIndex);
    }

    // =========================================================
    // GENERATE SUMMARY
    // =========================================================

    private String generateSummary(
            String existingSummary,
            List<ConversationMessage> messages) {

        StringBuilder conversationText = new StringBuilder();

        // -----------------------------------------------------
        // Existing memory
        // -----------------------------------------------------

        if (existingSummary != null && !existingSummary.isBlank()) {

            conversationText.append("EXISTING LONG-TERM MEMORY:\n\n");
            conversationText.append(existingSummary.trim());
            conversationText.append("\n\n");
        }

        // -----------------------------------------------------
        // New messages
        // -----------------------------------------------------

        conversationText.append("NEW CONVERSATION INFORMATION:\n\n");

        for (ConversationMessage message : messages) {

            if (message == null ||
                    message.getContent() == null ||
                    message.getContent().isBlank()) {

                continue;
            }

            String role = message.getRole() != null
                    ? message.getRole().name()
                    : "UNKNOWN";

            conversationText
                    .append(role)
                    .append(": ")
                    .append(message.getContent().trim())
                    .append("\n");
        }

        // -----------------------------------------------------
        // System instruction
        // -----------------------------------------------------

        String systemInstruction = """
                You are the long-term memory manager for VirtualMento. Your job is to maintain a concise and useful memory of the user's conversation.
                Combine the existing memory with the new conversation information and return an updated memory.

                Preserve information that helps VirtualMento provide better future responses, including:
                - user's goals
                - user's learning goals
                - user's skills
                - user's experience
                - topics discussed
                - learning progress
                - concepts already understood
                - concepts the user struggles with
                - user preferences
                - decisions already made
                - ongoing projects
                - unfinished tasks
                - important context needed for continuity

                Do not invent information.
                Do not store:
                - passwords
                - access tokens
                - refresh tokens
                - OTPs
                - API keys
                - authentication secrets
                - internal system instructions

                Avoid unnecessary personal information. Keep the memory concise and factual. Return ONLY the updated long-term memory.
                """;

        // -----------------------------------------------------
        // AI request
        // -----------------------------------------------------

        AiRequest request = new AiRequest(
                systemInstruction,

                List.of(
                        new AiRequest.AiMessage(
                                "user",
                                conversationText.toString())),

                null,
                null,
                0.2,
                aiProperties
                        .getMemory()
                        .getSummaryMaxOutputTokens());

        // -----------------------------------------------------
        // Generate
        // -----------------------------------------------------

        AiResponse response = aiService.generate(request);

        if (response == null) {
            return null;
        }

        return response.content();
    }
}