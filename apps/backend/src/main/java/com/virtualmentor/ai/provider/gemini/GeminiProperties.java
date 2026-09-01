package com.virtualmentor.ai.provider.gemini;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "virtualmentor.ai.gemini")
public class GeminiProperties {

    private String apiKey;

    private String baseUrl = "https://generativelanguage.googleapis.com";

    private String model;

    private double temperature = 0.7;

    private int maxOutputTokens = 2048;
}
