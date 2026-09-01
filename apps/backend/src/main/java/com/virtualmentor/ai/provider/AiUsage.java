package com.virtualmentor.ai.provider;

public record AiUsage(

                Integer inputTokens,

                Integer outputTokens,

                Integer totalTokens

) {
}