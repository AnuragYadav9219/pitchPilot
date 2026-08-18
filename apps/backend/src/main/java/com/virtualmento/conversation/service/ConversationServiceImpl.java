package com.virtualmento.conversation.service;

import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.ai.config.AiProperties;
import com.virtualmento.ai.context.ConversationContext;
import com.virtualmento.ai.context.ConversationContextBuilder;
import com.virtualmento.ai.context.UserProfileContext;
import com.virtualmento.ai.context.UserProfileContextMapper;
import com.virtualmento.ai.exception.AiProviderRateLimitException;
import com.virtualmento.ai.exception.AiProviderUnavailableException;
import com.virtualmento.ai.prompt.MentorPromptBuilder;
import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.service.AiService;
import com.virtualmento.common.exception.ResourceNotFoundException;
import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.conversation.dto.ConversationDetailResponse;
import com.virtualmento.conversation.dto.ConversationPageResponse;
import com.virtualmento.conversation.dto.ConversationResponse;
import com.virtualmento.conversation.dto.CreateConversationRequest;
import com.virtualmento.conversation.dto.MessageResponse;
import com.virtualmento.conversation.dto.SendMessageRequest;
import com.virtualmento.conversation.entity.Conversation;
import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.mapper.ConversationMapper;
import com.virtualmento.conversation.repository.ConversationMessageRepository;
import com.virtualmento.conversation.repository.ConversationRepository;
import com.virtualmento.evaluation.repository.SessionEvaluationRepository;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.entity.UserProfile;
import com.virtualmento.user.repository.UserProfileRepository;
import com.virtualmento.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ConversationServiceImpl implements ConversationService {

        private final ConversationRepository conversationRepository;
        private final ConversationMessageRepository messageRepository;
        private final UserRepository userRepository;
        private final UserProfileRepository userProfileRepository;
        private final SessionEvaluationRepository evaluationRepository;

        private final ConversationMapper conversationMapper;
        private final CurrentUserProvider currentUserProvider;

        private final AiService aiService;
        private final AiProperties aiProperties;
        private final MentorPromptBuilder mentorPromptBuilder;

        private final ConversationContextBuilder contextBuilder;
        private final UserProfileContextMapper profileContextMapper;

        private final ConversationMessagePersistenceService messagePersistenceService;
        private final ConversationSummaryService conversationSummaryService;
        private final ConversationTitleService conversationTitleService;

        // =========================================================
        // CREATE CONVERSATION
        // =========================================================

        @Override
        public ConversationResponse create(CreateConversationRequest request) {

                UUID userId = currentUserProvider.getUserId();

                User user = userRepository
                                .findById(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

                String title = request.title();

                if (title == null || title.isBlank()) {
                        title = "New Conversation";

                } else {
                        title = title.trim();
                }

                Conversation conversation = Conversation.builder()
                                .user(user)
                                .title(title)
                                .type(request.type())
                                .summary(null)
                                .archived(false)
                                .lastMessageAt(null)
                                .build();

                conversationRepository.save(conversation);

                return conversationMapper.toResponse(conversation);
        }

        // =========================================================
        // GET MY CONVERSATIONS
        // =========================================================

        @Override
        @Transactional(readOnly = true)
        public ConversationPageResponse getMyConversations(
                        int page,
                        int size) {

                UUID userId = currentUserProvider.getUserId();

                PageRequest pageable = PageRequest.of(page, size);

                Page<Conversation> conversationPage = conversationRepository
                                .findUserConversationsWithMessages(userId, pageable);

                return new ConversationPageResponse(
                                conversationPage
                                                .getContent()
                                                .stream()
                                                .map(conversationMapper::toResponse)
                                                .toList(),

                                conversationPage.getNumber(),
                                conversationPage.getSize(),
                                conversationPage.getTotalElements(),
                                conversationPage.getTotalPages(),
                                conversationPage.isFirst(),
                                conversationPage.isLast());
        }

        // =========================================================
        // GET CONVERSATION
        // =========================================================

        @Override
        public ConversationDetailResponse getConversation(UUID conversationId) {

                UUID userId = currentUserProvider.getUserId();

                Conversation conversation = getUserConversation(
                                conversationId,
                                userId);

                List<ConversationMessage> messages = messageRepository
                                .findByConversationIdOrderByCreatedAtAsc(conversation.getId());

                return new ConversationDetailResponse(
                                conversationMapper.toResponse(conversation),

                                messages.stream()
                                                .map(conversationMapper::toMessageResponse)
                                                .toList());
        }

        // =========================================================
        // SEND MESSAGE
        // =========================================================

        @Override
        public MessageResponse sendResponse(
                        UUID conversationId,
                        SendMessageRequest request) {

                UUID userId = currentUserProvider.getUserId();

                Conversation conversation = getUserConversation(
                                conversationId,
                                userId);

                // =====================================================
                // VALIDATE CONVERSATION
                // =====================================================

                if (Boolean.TRUE.equals(conversation.getArchived())) {
                        throw new IllegalStateException("Conversation is archived");
                }

                String content = request.content() == null
                                ? ""
                                : request.content().trim();

                if (content.isBlank()) {

                        throw new IllegalArgumentException("Message content cannot be empty");
                }

                boolean firstUserMessage = messageRepository
                                .countByConversationId(conversation.getId()) == 0;

                if (firstUserMessage) {
                        String generatedTitle = buildConversationTitle(conversation, content);

                        conversation.setTitle(generatedTitle);

                        conversationRepository.save(conversation);
                }

                // =====================================================
                // SAVE USER MESSAGE + PROCESSING ASSISTANT MESSAGE
                // =====================================================

                ConversationMessagePersistenceService.MessagePair messagePair = messagePersistenceService
                                .createMessages(
                                                conversation,
                                                content);

                // GENERATE USEFUL HISTORY TITLE
                if ("New Conversation".equals(conversation.getTitle())) {
                        String generatedTitle = conversationTitleService.generateFromMessage(content);

                        conversation.setTitle(generatedTitle);

                        conversationRepository.save(conversation);
                }

                ConversationMessage assistantMessage = messagePair.assistantMessage();

                // =====================================================
                // UPDATE LAST MESSAGE TIME
                // =====================================================

                conversation.setLastMessageAt(Instant.now());

                conversationRepository.save(conversation);

                // =====================================================
                // LOAD RECENT HISTORY
                // =====================================================

                int contextMessageCount = aiProperties
                                .getContext()
                                .getRecentMessageCount();

                List<ConversationMessage> recentMessages = messageRepository
                                .findByConversationIdOrderByCreatedAtDesc(
                                                conversation.getId(),
                                                PageRequest.of(
                                                                0,
                                                                contextMessageCount));

                /*
                 * Repository returns newest first.
                 *
                 * AI expects chronological order.
                 */
                Collections.reverse(recentMessages);

                // =====================================================
                // LOAD USER PROFILE
                // =====================================================

                UserProfile profile = userProfileRepository
                                .findByUserId(userId)
                                .orElse(null);

                UserProfileContext profileContext = profileContextMapper.toContext(profile);

                // =====================================================
                // BUILD CONVERSATION CONTEXT
                // =====================================================

                ConversationContext context = contextBuilder.build(
                                profileContext,
                                conversation.getSummary(),
                                recentMessages);

                // SCENARIO-SPECIFIC MENTOR BEHAVIOUR
                String mentorInstruction = mentorPromptBuilder.build(
                                conversation.getType(),
                                conversation.getTitle());

                String systemInstruction = mentorInstruction + "\n\n" + context.systemInstruction();

                // =====================================================
                // BUILD AI REQUEST
                // =====================================================

                AiRequest aiRequest = new AiRequest(
                                systemInstruction,
                                context.messages(),
                                null,
                                null,
                                null,
                                null);

                long startTime = System.currentTimeMillis();

                // =====================================================
                // CALL AI
                // =====================================================

                try {

                        AiResponse aiResponse = aiService.generate(aiRequest);

                        long latencyMs = System.currentTimeMillis() - startTime;

                        // =================================================
                        // SAVE COMPLETED ASSISTANT MESSAGE
                        // =================================================

                        ConversationMessage completedMessage = messagePersistenceService.markCompleted(
                                        assistantMessage.getId(),
                                        aiResponse,
                                        latencyMs);

                        // =================================================
                        // UPDATE CONVERSATION
                        // =================================================

                        conversation.setLastMessageAt(Instant.now());

                        conversationRepository.save(conversation);

                        // =================================================
                        // UPDATE LONG-TERM MEMORY
                        // =================================================

                        /*
                         * Memory is secondary to the actual AI response.
                         *
                         * If summarization fails, the user should still
                         * receive the successful AI response.
                         */
                        try {

                                conversationSummaryService.updateSummary(conversation);

                        } catch (Exception memoryException) {

                                log.warn("Failed to update conversation memory for conversation {}",
                                                conversation.getId(),
                                                memoryException);
                        }

                        // =================================================
                        // RETURN AI RESPONSE
                        // =================================================

                        return conversationMapper.toMessageResponse(completedMessage);

                } catch (AiProviderRateLimitException ex) {

                        messagePersistenceService.markFailed(
                                        assistantMessage.getId(),
                                        "AI_RATE_LIMITED");

                        throw ex;

                } catch (AiProviderUnavailableException ex) {

                        messagePersistenceService.markFailed(
                                        assistantMessage.getId(),
                                        "AI_PROVIDER_UNAVAILABLE");

                        throw ex;

                } catch (RuntimeException ex) {

                        /*
                         * Any unexpected AI failure should still mark
                         * the assistant message as FAILED.
                         */

                        messagePersistenceService.markFailed(
                                        assistantMessage.getId(),
                                        "AI_REQUEST_FAILED");

                        throw ex;
                }
        }

        // =========================================================
        // ARCHIVE
        // =========================================================

        @Override
        public void archive(UUID conversationId) {

                UUID userId = currentUserProvider.getUserId();

                Conversation conversation = getUserConversation(
                                conversationId,
                                userId);

                conversation.setArchived(true);

                conversationRepository.save(conversation);
        }

        // =========================================================
        // INTERNAL
        // =========================================================

        private Conversation getUserConversation(
                        UUID conversationId,
                        UUID userId) {

                return conversationRepository
                                .findByIdAndUserId(
                                                conversationId,
                                                userId)
                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Conversation not found"));
        }

        // =========================================================
        // PERMANENT DELETE
        // =========================================================

        @Override
        @Transactional
        public void permanentlyDelete(UUID conversationId) {

                UUID userId = currentUserProvider.getUserId();

                Conversation conversation = getUserConversation(
                                conversationId,
                                userId);

                evaluationRepository.findByConversationId(conversation.getId())
                                .ifPresent(evaluationRepository::delete);

                messageRepository.deleteByConversationId(conversation.getId());

                conversationRepository.delete(conversation);
        }

        // =========================================================
        // PRIVATE METHODS
        // =========================================================

        private String buildConversationTitle(
                        Conversation conversation,
                        String firstMessage) {

                String cleaned = firstMessage
                                .replaceAll("\\s+", " ")
                                .trim();

                if (cleaned.isBlank()) {
                        return conversation.getTitle();
                }

                /*
                 * Remove common introductions.
                 */
                cleaned = cleaned.replaceFirst("(?i)^(hi|hello|hey)[,!.]?\\s*", "");

                cleaned = cleaned.replaceFirst("(?i)^(my name is|i am|i'm)\\s+[^,.!?]+[,!.]?\\s*", "");

                if (cleaned.isBlank()) {
                        return conversation.getTitle();
                }

                if (cleaned.length() > 60) {
                        cleaned = cleaned.substring(0, 57)
                                        .trim() + "...";
                }

                return switch (conversation.getType()) {

                        case INTERVIEW ->
                                "Interview: " + cleaned;

                        case ROLEPLAY ->
                                "Roleplay: " + cleaned;

                        case CAREER ->
                                "Career: " + cleaned;

                        case CODING ->
                                "Coding: " + cleaned;

                        case LEARNING ->
                                "Learning: " + cleaned;

                        case GENERAL ->
                                cleaned;
                };
        }
}