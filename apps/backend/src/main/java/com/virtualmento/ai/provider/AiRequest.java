package com.virtualmento.ai.provider;

import java.util.List;

public record AiRequest(

        String systemInstruction,

        List<AiMessage> messages,

        AiProviderType provider,

        String model,

        Double temperature,

        Integer maxOutputTokens

) {

    public record AiMessage(

            String role,

            String content

    ) {
    }
}