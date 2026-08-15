package com.virtualmento.ai.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import com.virtualmento.ai.provider.AiProviderType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "virtualmento.ai")
public class AiProperties {

    private AiProviderType defaultProvider = AiProviderType.GEMINI;

    private Context context = new Context();

    private Retry retry = new Retry();
    private Memory memory = new Memory();

    @Getter
    @Setter
    public static class Context {
        private int recentMessageCount = 20;
    }

    @Getter
    @Setter
    public static class Retry {
        private int maxAttempts = 2;
        private long backoffMs = 500;
    }

    @Getter
    @Setter
    public static class Memory {
        private int summaryThreshold = 30;
        private int summaryMaxOutputTokens = 500;
    }
}
