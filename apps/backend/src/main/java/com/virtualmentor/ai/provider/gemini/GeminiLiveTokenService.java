package com.virtualmentor.ai.provider.gemini;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualmentor.ai.config.GeminiProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiLiveTokenService {

        private final GeminiProperties properties;
        private final ObjectMapper objectMapper;

        public GeminiLiveToken createToken(String systemInstruction) {

                validateConfiguration();

                Instant now = Instant.now();

                Instant expireTime = now.plus(30, ChronoUnit.MINUTES);

                Instant newSessionExpireTime = now.plus(1, ChronoUnit.MINUTES);

                /*
                 * ---------------------------------------------------------
                 * BidiGenerateContentSetup
                 * ---------------------------------------------------------
                 *
                 * This is the configuration that the ephemeral token
                 * constrains the browser's Gemini Live session to use.
                 */
                Map<String, Object> generationConfig = new LinkedHashMap<>();

                generationConfig.put("responseModalities", List.of("AUDIO"));
                generationConfig.put("temperature", properties.getTemperature());
                generationConfig.put("maxOutputTokens", properties.getMaxOutputTokens());

                Map<String, Object> systemInstructionObject = new LinkedHashMap<>();

                systemInstructionObject.put(
                                "parts",
                                List.of(Map.of("text", systemInstruction)));

                Map<String, Object> liveSetup = new LinkedHashMap<>();

                liveSetup.put("model", modelName());
                liveSetup.put("generationConfig", generationConfig);
                liveSetup.put("systemInstruction", systemInstructionObject);

                /*
                 * Enable input transcript
                 *
                 * User speech -> text transcript
                 */
                liveSetup.put("inputAudioTranscription", Map.of());

                /*
                 * Enable output transcript
                 *
                 * AI speech -> text transcript
                 */
                liveSetup.put("outputAudioTranscription", Map.of());

                Map<String, Object> request = new LinkedHashMap<>();

                request.put("uses", 1);
                request.put("expireTime", expireTime.toString());
                request.put("newSessionExpireTime", newSessionExpireTime.toString());
                request.put("bidiGenerateContentSetup", liveSetup);
                log.info("Gemini Live token request: {}", request);

                try {

                        RestClient restClient = RestClient.builder()
                                        .baseUrl(properties.getBaseUrl())
                                        .build();

                        String response = restClient.post()
                                        .uri("/v1beta/auth_tokens")
                                        .header("x-goog-api-key", properties.getApiKey())
                                        .contentType(MediaType.APPLICATION_JSON)
                                        .body(request)
                                        .retrieve()
                                        .body(String.class);

                        log.info("Gemini Live token created successfully");

                        log.debug("Gemini Live token response: {}", response);

                        JsonNode json = objectMapper.readTree(response);

                        String token = json.path("name")
                                        .asText(null);

                        if (token == null || token.isBlank()) {

                                throw new IllegalStateException("Gemini did not return an ephemeral token");
                        }

                        /*
                         * Google returns the token itself in "name".
                         */
                        return new GeminiLiveToken(token, expireTime);

                } catch (Exception exception) {

                        log.error("Failed to create Gemini Live ephemeral token", exception);

                        throw new IllegalStateException(
                                        "Failed to create Gemini Live ephemeral token",
                                        exception);
                }
        }

        private String modelName() {

                String model = properties.getLiveModel();

                if (model == null || model.isBlank()) {
                        throw new IllegalStateException(
                                        "Gemini Live model is not configured");
                }

                if (model.startsWith("models/")) {
                        return model;
                }

                return "models/" + model;
        }

        private void validateConfiguration() {

                if (properties.getApiKey() == null || properties.getApiKey().isBlank()) {

                        throw new IllegalStateException("GEMINI_API_KEY is not configured");
                }

                if (properties.getBaseUrl() == null || properties.getBaseUrl().isBlank()) {

                        throw new IllegalStateException("Gemini base URL is not configured");
                }
        }

        public record GeminiLiveToken(
                        String token,
                        Instant expiresAt) {
        }
}