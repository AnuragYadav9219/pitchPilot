package com.virtualmentor.ai.provider.gemini;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmentor.ai.config.GeminiProperties;
import com.virtualmentor.ai.model.AiRequest;
import com.virtualmentor.ai.model.AiResponse;
import com.virtualmentor.ai.provider.AiProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GeminiAiProvider implements AiProvider {

    private final GeminiProperties properties;
    private final RestClient.Builder restClientBuilder;

    @Override
    public AiResponse generate(AiRequest request) {
        if (properties.getApiKey() == null || properties.getApiKey().isBlank()) {
            throw new IllegalStateException("GEMINI api key is not configured");
        }

        if (request == null) {
            throw new IllegalArgumentException("AI request cannot be null");
        }

        String prompt = buildPrompt(request);

        GeminiGenerateRequest body = new GeminiGenerateRequest(
                List.of(new GeminiContent("user", List.of(new GeminiPart(prompt)))),
                new GeminiGenerationConfig(properties.getTemperature(), properties.getMaxOutputTokens()));

        try {

            GeminiGenerateResponse response = restClientBuilder
                    .baseUrl(properties.getBaseUrl())
                    .build()
                    .post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/v1beta/models/{model}:generateContent")
                            .queryParam(
                                    "key",
                                    properties.getApiKey())
                            .build(properties.getModel()))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(GeminiGenerateResponse.class);

            if (response == null) {
                throw new IllegalStateException("Gemini returned an empty response");
            }

            String content = extractContent(response);

            if (content == null || content.isBlank()) {
                throw new IllegalStateException("Gemini returned no generated text");
            }

            log.info(
                    "Gemini response generated successfully. length={}",
                    content.length());

            return new AiResponse(
                    content,
                    Map.of(
                            "provider", "GEMINI",
                            "model", properties.getModel()));

        } catch (Exception e) {
            log.error(
                    "Gemini AI generation failed. model={}",
                    properties.getModel(),
                    e);

            throw new IllegalStateException(
                    "Gemini AI request failed",
                    e);
        }
    }

    private String buildPrompt(AiRequest request) {

        StringBuilder prompt = new StringBuilder();

        if (request.systemPrompt() != null && !request.systemPrompt().isBlank()) {

            prompt.append("""
                    SYSTEM INSTRUCTIONS:
                    """);

            prompt.append(request.systemPrompt());

            prompt.append("\n\n");
        }

        if (request.context() != null && !request.context().isEmpty()) {

            prompt.append("""
                    CONTEXT:
                    """);

            for (String context : request.context()) {
                if (context != null && !context.isBlank()) {
                    prompt.append(context);
                    prompt.append("\n");
                }
            }

            prompt.append("\n");
        }

        prompt.append("""
                USER REQUEST:
                """);

        prompt.append(
                request.userPrompt() == null
                        ? ""
                        : request.userPrompt());

        return prompt.toString();
    }

    private String extractContent(GeminiGenerateResponse response) {

        if (response.candidates() == null || response.candidates().isEmpty()) {
            return null;
        }

        GeminiCandidate candidate = response.candidates().get(0);

        if (candidate.content() == null
                || candidate.content().parts() == null
                || candidate.content().parts().isEmpty()) {
            return null;
        }

        return candidate.content()
                .parts()
                .stream()
                .map(GeminiPartResponse::text)
                .filter(text -> text != null && !text.isBlank())
                .reduce(
                        "",
                        (a, b) -> a.isBlank()
                                ? b
                                : a + b);
    }

    // ============================================================
    // Gemini request models
    // ============================================================

    private record GeminiGenerateRequest(
            List<GeminiContent> contents,
            GeminiGenerationConfig generationConfig) {
    }

    private record GeminiContent(
            String role,
            List<GeminiPart> parts) {
    }

    private record GeminiPart(
            String text) {
    }

    private record GeminiGenerationConfig(
            double temperature,
            int maxOutputTokens) {
    }

    // ============================================================
    // Gemini response models
    // ============================================================

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record GeminiGenerateResponse(
            List<GeminiCandidate> candidates) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record GeminiCandidate(
            GeminiResponseContent content) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record GeminiResponseContent(
            List<GeminiPartResponse> parts) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record GeminiPartResponse(
            @JsonProperty("text") String text) {
    }
}