package com.virtualmentor.voice.provider.gemini;

import org.springframework.stereotype.Service;

import com.virtualmentor.ai.config.GeminiProperties;
import com.virtualmentor.ai.provider.gemini.GeminiLiveTokenService;
import com.virtualmentor.voice.model.VoiceSessionRequest;
import com.virtualmentor.voice.model.VoiceSessionResponse;
import com.virtualmentor.voice.provider.VoiceProvider;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GeminiVoiceProvider implements VoiceProvider {

    private final GeminiProperties properties;
    private final GeminiLiveTokenService tokenService;

    @Override
    public VoiceSessionResponse createSession(VoiceSessionRequest request) {

        String systemInstruction = request.systemPrompt();

        GeminiLiveTokenService.GeminiLiveToken token = tokenService.createToken(systemInstruction);

        return new VoiceSessionResponse(
                request.interviewId(),
                "GEMINI",
                properties.getLiveModel(),
                "WEBSOCKET",
                token.token(),
                token.expiresAt());
    }

    @Override
    public void endSession(String sessionId) {
        // TODO 
    }
}
