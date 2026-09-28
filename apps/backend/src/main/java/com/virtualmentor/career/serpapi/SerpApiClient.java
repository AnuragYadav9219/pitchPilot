package com.virtualmentor.career.serpapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualmentor.career.config.SerpApiProperties;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class SerpApiClient {

        private final SerpApiProperties properties;
        private final ObjectMapper objectMapper;

        public JsonNode searchJobs(String query, String location) {

                log.info("Starting SerpAPI job search: query={}, location={}", query, location);

                SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();

                factory.setConnectTimeout(Duration.ofSeconds(10));
                factory.setReadTimeout(Duration.ofSeconds(30));

                RestClient client = RestClient.builder()
                                .baseUrl(properties.baseUrl())
                                .requestFactory(factory)
                                .build();

                try {

                        String response = client
                                        .get()
                                        .uri(uriBuilder -> uriBuilder
                                                        .path("/search")
                                                        .queryParam("engine", "google_jobs")
                                                        .queryParam("q", query)
                                                        .queryParam("location", location)
                                                        .queryParam("gl", "in")
                                                        .queryParam("hl", "en")
                                                        .queryParam("api_key", properties.apiKey())
                                                        .build())
                                        .retrieve()
                                        .body(String.class);

                        log.info("SerpAPI response received");

                        if (response == null || response.isBlank()) {
                                throw new IllegalStateException("SerpApi returned an empty response");
                        }

                        try {
                                return objectMapper.readTree(response);

                        } catch (Exception e) {

                                log.error("Failed to parse SerpApi response", e);

                                throw new IllegalStateException("Failed to parse SerpApi response", e);
                        }

                } catch (Exception e) {

                        log.error("SerpAPI job search failed: query={}, location={}", query, location, e);

                        throw new IllegalStateException("Job search failed: " + e.getMessage(), e);
                }
        }
}