package com.virtualmentor.evaluation.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.evaluation.dto.SessionEvaluationResponse;
import com.virtualmentor.evaluation.service.SessionEvaluationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/conversations/{conversationId}/evaluation")
@RequiredArgsConstructor
public class SessionEvaluationController {

        private final SessionEvaluationService evaluationService;

        private final ResponseBuilder responseBuilder;

        // =========================================================
        // GENERATE EVALUATION
        // =========================================================

        @PostMapping
        public ResponseEntity<ApiResponse<SessionEvaluationResponse>> evaluate(
                        @PathVariable UUID conversationId) {

                return responseBuilder.ok(
                                "Session evaluation generated successfully",
                                evaluationService.evaluate(
                                                conversationId));
        }

        // =========================================================
        // GET EVALUATION
        // =========================================================

        @GetMapping
        public ResponseEntity<ApiResponse<SessionEvaluationResponse>> getEvaluation(
                        @PathVariable UUID conversationId) {

                return responseBuilder.ok(
                                "Session evaluation fetched successfully",
                                evaluationService.getEvaluation(
                                                conversationId));
        }
}