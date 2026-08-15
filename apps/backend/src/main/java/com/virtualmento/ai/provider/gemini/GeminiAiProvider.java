package com.virtualmento.ai.provider.gemini;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.virtualmento.ai.exception.AiProviderException;
import com.virtualmento.ai.exception.AiProviderRateLimitException;
import com.virtualmento.ai.exception.AiProviderUnavailableException;
import com.virtualmento.ai.provider.AiProvider;
import com.virtualmento.ai.provider.AiProviderType;
import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.provider.AiUsage;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GeminiAiProvider implements AiProvider {

        private final GeminiProperties properties;
        private final RestClient.Builder restClientBuilder;

        @Override
        public AiProviderType getType() {
                return AiProviderType.GEMINI;
        }

        @Override
        public AiResponse generate(AiRequest request) {

                String actualModel = request.model() != null &&
                                !request.model().isBlank()
                                                ? request.model()
                                                : properties.getModel();

                RestClient client = restClientBuilder
                                .baseUrl(properties.getBaseUrl())
                                .build();

                GeminiRequest geminiRequest = buildRequest(request);

                try {
                        GeminiResponse response = client
                                        .post()
                                        .uri(uriBuilder -> uriBuilder.path(
                                                        "/v1beta/models/{model}:generateContent")
                                                        .queryParam(
                                                                        "key",
                                                                        properties.getApiKey())
                                                        .build(actualModel))
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .body(geminiRequest)
                                        .retrieve()
                                        .body(GeminiResponse.class);

                        return mapResponse(
                                        response,
                                        request);

                } catch (HttpClientErrorException.TooManyRequests ex) {

                        throw new AiProviderRateLimitException(
                                        "AI provider rate limit reached");

                } catch (HttpServerErrorException.ServiceUnavailable ex) {

                        throw new AiProviderUnavailableException(
                                        "AI provider is unavailable",
                                        ex);

                } catch (HttpServerErrorException.GatewayTimeout ex) {

                        throw new AiProviderUnavailableException(
                                        "AI provider time out",
                                        ex);

                } catch (ResourceAccessException ex) {

                        throw new AiProviderUnavailableException(
                                        "AI provider request timed out or is unreachable",
                                        ex);

                } catch (RestClientException ex) {

                        throw new AiProviderException(
                                        "AI provider request failed",
                                        ex);
                }
        }

        // =============================================================
        // PRIVATE METHODS
        // =============================================================

        private GeminiRequest buildRequest(AiRequest request) {
                List<GeminiContent> contents = request
                                .messages()
                                .stream()
                                .map(message -> new GeminiContent(
                                                mapRole(message.role()),
                                                List.of(
                                                                new GeminiPart(message.content()))))
                                .toList();

                GeminiGenerationConfig config = new GeminiGenerationConfig(
                                request.temperature() != null
                                                ? request.temperature()
                                                : properties.getTemperature(),

                                request.maxOutputTokens() != null
                                                ? request.maxOutputTokens()
                                                : properties.getMaxOutputTokens());

                GeminiSystemInstruction systemInstruction = request.systemInstruction() == null
                                ? null
                                : new GeminiSystemInstruction(
                                                List.of(
                                                                new GeminiPart(request.systemInstruction())));

                return new GeminiRequest(
                                contents,
                                systemInstruction,
                                config);
        }

        private String mapRole(String role) {

                return switch (role.toLowerCase()) {
                        case "assistant" -> "model";
                        case "user" -> "user";
                        default -> "user";
                };
        }

        private AiResponse mapResponse(GeminiResponse response, AiRequest request) {

                if (response == null ||
                                response.candidates() == null ||
                                response.candidates().isEmpty()) {
                        throw new AiProviderException(
                                        "Gemini returned an empty response");
                }

                GeminiCandidate candidate = response.candidates().get(0);

                if (candidate.content() == null ||
                                candidate.content().parts() == null ||
                                candidate.content().parts().isEmpty()) {
                        throw new AiProviderException(
                                        "Gemini returned no generated content");
                }

                String content = candidate.content()
                                .parts()
                                .stream()
                                .map(GeminiPart::text)
                                .filter(text -> text != null &&
                                                !text.isBlank())
                                .reduce(
                                                "",
                                                (a, b) -> a + b);

                if (content.isBlank()) {
                        throw new AiProviderException("Gemini returned empty generated content");
                }

                GeminiUsageMetadata usage = response.usageMetadata();

                AiUsage aiUsage = usage == null
                                ? new AiUsage(null, null, null)
                                : new AiUsage(
                                                usage.promptTokenCount(),
                                                usage.candidatesTokenCount(),
                                                usage.totalTokenCount());

                String actualModel = request
                                .model() != null &&
                                !request.model().isBlank()
                                                ? request.model()
                                                : properties.getModel();

                return new AiResponse(
                                content,
                                AiProviderType.GEMINI,
                                actualModel,
                                aiUsage,
                                null);
        }

        // =========================================================
        // GEMINI REQUEST MODELS
        // =========================================================

        private record GeminiRequest(
                        List<GeminiContent> contents,
                        GeminiSystemInstruction systemInstruction,
                        GeminiGenerationConfig generationConfig) {

        }

        private record GeminiContent(
                        String role,
                        List<GeminiPart> parts) {

        }

        private record GeminiSystemInstruction(
                        List<GeminiPart> parts) {
        }

        private record GeminiPart(
                        String text) {
        }

        private record GeminiGenerationConfig(
                        double temperature,
                        int maxOutputTokens) {
        }

        // =========================================================
        // GEMINI RESPONSE MODELS
        // =========================================================

        @JsonIgnoreProperties(ignoreUnknown = true)
        private record GeminiResponse(
                        List<GeminiCandidate> candidates,
                        GeminiUsageMetadata usageMetadata) {
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private record GeminiCandidate(
                        GeminiContent content) {
        }

        @JsonIgnoreProperties(ignoreUnknown = true)
        private record GeminiUsageMetadata(
                        Integer promptTokenCount,
                        Integer candidatesTokenCount,
                        Integer totalTokenCount) {
        }
}
