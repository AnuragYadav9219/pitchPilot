package com.virtualmentor.voice.provider;

import com.virtualmentor.voice.model.VoiceSessionRequest;
import com.virtualmentor.voice.model.VoiceSessionResponse;

public interface VoiceProvider {

    VoiceSessionResponse createSession(VoiceSessionRequest request);

    void endSession(String sessionId);
}