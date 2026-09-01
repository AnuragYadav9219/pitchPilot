package com.virtualmentor.conversation.mapper;

import org.springframework.stereotype.Component;

import com.virtualmentor.conversation.dto.ConversationResponse;
import com.virtualmentor.conversation.dto.MessageResponse;
import com.virtualmentor.conversation.entity.Conversation;
import com.virtualmentor.conversation.entity.ConversationMessage;
import com.virtualmentor.evaluation.dto.SessionEvaluationResponse;
import com.virtualmentor.evaluation.entity.SessionEvaluation;

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

        public SessionEvaluationResponse toEvaluationResponse(
                        SessionEvaluation evaluation) {

                return new SessionEvaluationResponse(
                                evaluation.getId(),
                                evaluation.getConversation().getId(),
                                evaluation.getStatus(),
                                evaluation.getOverallScore(),
                                evaluation.getCommunicationScore(),
                                evaluation.getClarityScore(),
                                evaluation.getConfidenceScore(),
                                evaluation.getRelevanceScore(),
                                evaluation.getStrengths(),
                                evaluation.getImprovements(),
                                evaluation.getRecommendation(),
                                evaluation.getEvaluatorFeedback(),
                                evaluation.getCreatedAt(),
                                evaluation.getCompletedAt());
        }
}