package com.virtualmentor.conversation.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.conversation.dto.ConversationMessageResponse;
import com.virtualmentor.conversation.dto.SaveConversationMessageRequest;
import com.virtualmentor.conversation.entity.ConversationMessage;
import com.virtualmentor.conversation.repository.ConversationMessageRepository;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationMessageServiceImpl implements ConversationMessageService {

    private final ConversationMessageRepository messageRepository;

    private final InterviewRepository interviewRepository;

    @Override
    @Transactional
    public ConversationMessageResponse saveMessage(
            Long interviewId,
            UUID userId,
            SaveConversationMessageRequest request) {

        /*
         * Always verify that this interview belongs
         * to the authenticated user.
         */
        Interview interview = interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found"));

        String content = request.content()
                .replaceAll("\\s+", " ")
                .trim();

        if (content.isBlank()) {
            throw new IllegalArgumentException("Message content cannot be empty");
        }

        /*
         * Calculate the next message position.
         *
         * This is simple and sufficient for the current
         * single-user interview flow.
         */
        int sequenceNumber = (int) messageRepository
                .countByInterviewIdAndUserIdAndDeletedFalse(interviewId, userId);

        ConversationMessage message = ConversationMessage.builder()
                .interviewId(interviewId)
                .userId(userId)
                .role(request.role())
                .content(content)
                .sequenceNumber(sequenceNumber)
                .deleted(false)
                .build();

        ConversationMessage saved = messageRepository.save(message);

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ConversationMessageResponse> getMessages(
            Long interviewId,
            UUID userId) {

        /*
         * Authorization check.
         */
        interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found"));

        return messageRepository
                .findByInterviewIdAndUserIdAndDeletedFalseOrderBySequenceNumberAsc(interviewId, userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ConversationMessageResponse toResponse(ConversationMessage message) {

        return new ConversationMessageResponse(
                message.getId(),
                message.getInterviewId(),
                message.getRole(),
                message.getContent(),
                message.getSequenceNumber(),
                message.getCreatedAt());
    }
}