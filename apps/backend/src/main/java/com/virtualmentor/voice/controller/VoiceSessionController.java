package com.virtualmentor.voice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.voice.model.VoiceSessionResponse;
import com.virtualmentor.voice.service.VoiceSessionService;

import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class VoiceSessionController {

    private final VoiceSessionService voiceSessionService;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    @PostMapping("/{interviewId}/voice/session")
    public ResponseEntity<ApiResponse<VoiceSessionResponse>> createVoiceSession(@PathVariable Long interviewId) {

        UUID userId = currentUserProvider.getUserId();

        VoiceSessionResponse response = voiceSessionService.createSession(interviewId, userId);

        return responseBuilder.ok(
                "Voice session created successfully",
                response);
    }

}
