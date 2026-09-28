package com.virtualmentor.interview.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.interview.dto.InterviewResponse;
import com.virtualmentor.interview.dto.StartInterviewRequest;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.service.InterviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {

        private final InterviewService interviewService;
        private final CurrentUserProvider currentUserProvider;
        private final ResponseBuilder responseBuilder;

        @PostMapping
        public ResponseEntity<ApiResponse<InterviewResponse>> createInterview(
                        @Valid @RequestBody StartInterviewRequest request) {

                UUID userId = currentUserProvider.getUserId();

                Interview interview = interviewService.createInterview(userId, request);

                InterviewResponse response = InterviewResponse.from(interview);

                return responseBuilder.ok(
                                "Interview session created",
                                response);
        }

        @PatchMapping("/{interviewId}/complete")
        public ResponseEntity<ApiResponse<InterviewResponse>> completeInterview(@PathVariable Long interviewId) {

                UUID userId = currentUserProvider.getUserId();

                Interview interview = interviewService.completeInterview(interviewId, userId);

                InterviewResponse response = toResponse(interview);

                return responseBuilder.ok(
                                "Interview completed successfully",
                                response);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<InterviewResponse>>> getInterviews() {
                UUID userId = currentUserProvider.getUserId();

                List<InterviewResponse> interviews = interviewService
                                .getUserInterviews(userId)
                                .stream()
                                .map(this::toResponse)
                                .toList();

                return responseBuilder.ok(
                                "Interviews fetched successfully",
                                interviews);
        }

        @GetMapping("/{interviewId}")
        public ResponseEntity<ApiResponse<InterviewResponse>> getInterview(
                        @PathVariable Long interviewId) {
                UUID userId = currentUserProvider.getUserId();

                Interview interview = interviewService.getInterview(
                                interviewId,
                                userId);

                return responseBuilder.ok(
                                "Interview fetched successfully",
                                toResponse(interview));
        }

        private InterviewResponse toResponse(Interview interview) {
                return new InterviewResponse(
                                interview.getId(),
                                interview.getType(),
                                interview.getDifficulty(),
                                interview.getStatus(),
                                interview.getRole(),
                                interview.getTopics(),
                                interview.getDurationMinutes(),
                                interview.getVoiceProvider(),
                                interview.getStartedAt(),
                                interview.getCompletedAt(),
                                interview.getCreatedAt());
        }
}
