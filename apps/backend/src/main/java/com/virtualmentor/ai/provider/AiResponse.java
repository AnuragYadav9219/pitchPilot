package com.virtualmentor.ai.provider;

public record AiResponse(

        String content,

        AiProviderType provider,

        String model,

        AiUsage usage,

        String providerRequestId

) {

}