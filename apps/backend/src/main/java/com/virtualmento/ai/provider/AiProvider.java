package com.virtualmento.ai.provider;

public interface AiProvider {

    AiProviderType getType();

    AiResponse generate(
            AiRequest request
    );
}