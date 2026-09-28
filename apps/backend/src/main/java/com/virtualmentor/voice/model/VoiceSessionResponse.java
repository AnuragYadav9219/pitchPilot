package com.virtualmentor.voice.model;

import java.time.Instant;

public record VoiceSessionResponse(

                Long interviewId,

                String provider,

                String model,

                String connectionType,

                String accessToken,

                Instant expiresAt

) {
}