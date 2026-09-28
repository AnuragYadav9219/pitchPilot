package com.virtualmentor.ai.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "virtualmentor.ai.gemini")
public class GeminiProperties {
    private String apiKey;

    private String model;

    private String liveModel;

    private String baseUrl;

    private double temperature = 0.7;

    private int maxOutputTokens = 2048;
}
