package com.virtualmentor.conversation.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.conversation.dto.ConversationMessageResponse;
import com.virtualmentor.conversation.dto.SaveConversationMessageRequest;
import com.virtualmentor.conversation.service.ConversationMessageService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class ConversationMessageController {

        private final ConversationMessageService conversationMessageService;

        private final CurrentUserProvider currentUserProvider;

        private final ResponseBuilder responseBuilder;

        /**
         * Save one finalized conversation message.
         */
        @PostMapping("/{interviewId}/messages")
        public ResponseEntity<ApiResponse<ConversationMessageResponse>> saveMessage(
                        @PathVariable Long interviewId,
                        @Valid @RequestBody SaveConversationMessageRequest request) {

                UUID userId = currentUserProvider.getUserId();

                ConversationMessageResponse response = conversationMessageService.saveMessage(
                                interviewId,
                                userId,
                                request);

                return responseBuilder.ok(
                                "Message saved successfully",
                                response);
        }

        /**
         * Load all persisted messages for an interview.
         */
        @GetMapping("/{interviewId}/messages")
        public ResponseEntity<ApiResponse<List<ConversationMessageResponse>>> getMessages(
                        @PathVariable Long interviewId) {

                UUID userId = currentUserProvider.getUserId();

                List<ConversationMessageResponse> messages = conversationMessageService.getMessages(
                                interviewId,
                                userId);

                return responseBuilder.ok(
                                "Conversation fetched successfully",
                                messages);
        }
}