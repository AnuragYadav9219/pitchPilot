package com.virtualmentor.ai.model;

import lombok.Builder;

import java.util.List;
import java.util.Map;

@Builder
public record GeminiBidiGenerateContentSetup(
        String model,
        List<String> responseModalities,
        Map<String, Object> systemInstruction,
        Map<String, Object> inputAudioTranscription,
        Map<String, Object> outputAudioTranscription) {
}