package com.virtualmentor.career.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "virtualmentor.serpapi")
public record SerpApiProperties(
        String apiKey,
        String baseUrl) {
}