package com.virtualmento.conversation.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.conversation.dto.ConversationDetailResponse;
import com.virtualmento.conversation.dto.ConversationPageResponse;
import com.virtualmento.conversation.dto.ConversationResponse;
import com.virtualmento.conversation.dto.CreateConversationRequest;
import com.virtualmento.conversation.dto.MessageResponse;
import com.virtualmento.conversation.dto.SendMessageRequest;
import com.virtualmento.conversation.service.ConversationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/conversations")
@RequiredArgsConstructor
public class ConversationController {

        private final ConversationService conversationService;
        private final ResponseBuilder responseBuilder;

        // =========================================================
        // CREATE
        // =========================================================

        @PostMapping
        public ResponseEntity<ApiResponse<ConversationResponse>> create(
                        @Valid @RequestBody CreateConversationRequest request) {

                return responseBuilder.ok(
                                "Conversation created successfully",
                                conversationService.create(request));
        }

        // =========================================================
        // LIST
        // =========================================================

        @GetMapping
        public ResponseEntity<ApiResponse<ConversationPageResponse>> getMyConversations(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "20") int size) {

                if (page < 0) {
                        page = 0;
                }

                if (size < 1) {
                        size = 20;
                }

                if (size > 50) {
                        size = 50;
                }

                return responseBuilder.ok(
                                "Conversations fetched successfully",
                                conversationService.getMyConversations(
                                                page,
                                                size));
        }

        // =========================================================
        // DETAILS
        // =========================================================

        @GetMapping("/{conversationId}")
        public ResponseEntity<ApiResponse<ConversationDetailResponse>> getConversation(
                        @PathVariable UUID conversationId) {

                return responseBuilder.ok(
                                "Conversation fetched successfully",
                                conversationService.getConversation(
                                                conversationId));
        }

        // =========================================================
        // SEND MESSAGE
        // =========================================================

        @PostMapping("/{conversationId}/messages")
        public ResponseEntity<ApiResponse<MessageResponse>> sendMessage(
                        @PathVariable UUID conversationId,
                        @Valid @RequestBody SendMessageRequest request) {

                return responseBuilder.ok(
                                "Message sent successfully",
                                conversationService.sendResponse(
                                                conversationId,
                                                request));
        }

        // =========================================================
        // ARCHIVE
        // =========================================================

        @DeleteMapping("/{conversationId}")
        public ResponseEntity<ApiResponse<Void>> archive(@PathVariable UUID conversationId) {

                conversationService.archive(conversationId);

                return responseBuilder.ok(
                                "Conversation archived successfully",
                                null);
        }

        // =========================================================
        // PERMANENT DELETE
        // =========================================================

        @DeleteMapping("/{conversationId}/permanent")
        public ResponseEntity<ApiResponse<Void>> permanentlyDelete(
                        @PathVariable UUID conversationId) {

                conversationService.permanentlyDelete(
                                conversationId);

                return responseBuilder.ok(
                                "Conversation deleted permanently",
                                null);
        }
}