package com.virtualmentor.ai.provider;

public interface AiProvider {

    AiProviderType getType();

    AiResponse generate(
            AiRequest request);
}