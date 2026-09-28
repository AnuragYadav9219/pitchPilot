package com.virtualmentor.voice.service;

import java.util.UUID;

import com.virtualmentor.voice.model.VoiceSessionResponse;

public interface VoiceSessionService {

    VoiceSessionResponse createSession(
            Long interviewId,
            UUID userId);
}