package com.virtualmentor.career.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualmentor.ai.model.AiRequest;
import com.virtualmentor.ai.model.AiResponse;
import com.virtualmentor.ai.provider.AiProvider;
import com.virtualmentor.career.dto.CareerAiAnalysis;
import com.virtualmentor.career.dto.CareerIntelligenceResponse;
import com.virtualmentor.career.dto.SkillDemand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CareerAiServiceImpl implements CareerAiService {

        private final AiProvider aiProvider;
        private final ObjectMapper objectMapper;

        @Override
        public CareerAiAnalysis analyze(CareerIntelligenceResponse intelligence) {

                AiRequest request = AiRequest.builder()
                        .systemPrompt(buildSystemPrompt())
                        .context(buildContext(intelligence))
                        .userPrompt(buildUserPrompt(intelligence))
                        .build();

                AiResponse response = aiProvider.generate(request);

                try {
                        return parseResponse(response.content());

                } catch (Exception firstFailure) {

                        log.warn("Career AI returned invalid JSON. Retrying once.");

                        AiRequest retryRequest = AiRequest.builder()
                                .systemPrompt(buildRetrySystemPrompt())
                                .context(buildContext(intelligence))
                                .userPrompt(buildRetryUserPrompt())
                                .build();

                        AiResponse retryResponse = aiProvider.generate(retryRequest);

                        return parseResponse(retryResponse.content());
                }
        }

        // ============================================================
        // SYSTEM PROMPT
        // ============================================================

        private String buildSystemPrompt() {

                return """
                        You are VirtualMentor's Career Intelligence AI.
                        Analyze only the supplied live job-market data.
                        RETURN ONLY VALID JSON.
                        STRICT RULES:
                        - Do not use Markdown.
                        - Do not use ```json.
                        - Do not write explanations outside the JSON.
                        - Every string must be completely closed.
                        - Do not include newline characters inside JSON strings.
                        - Keep every string concise.
                        - Do not repeat job descriptions.
                        - Do not invent market facts.
                        - Use only information supported by the supplied data.
                        - Return the exact JSON structure below.
                        JSON STRUCTURE:
                        {
                          "summary": "Concise market summary.",
                          "prioritySkills": [
                            "skill 1",
                            "skill 2",
                            "skill 3"
                          ],
                          "interviewTopics": [
                            "topic 1",
                            "topic 2",
                            "topic 3"
                          ],
                          "preparationPlan": [
                            "step 1",
                            "step 2",
                            "step 3",
                            "step 4"
                          ]
                        }
                        Maximum:
                        - 1 summary
                        - 6 priority skills
                        - 6 interview topics
                        - 5 preparation steps
                """;
        }

        // ============================================================
        // RETRY SYSTEM PROMPT
        // ============================================================

        private String buildRetrySystemPrompt() {

                return """
                        You are VirtualMentor's Career Intelligence AI.
                        The previous response was invalid JSON.
                        Generate a NEW response.
                        RETURN ONLY A COMPLETE VALID JSON OBJECT.
                        Do not use Markdown.
                        Do not use ```json.
                        Do not add any explanation.
                        Do not leave any string unfinished.
                        Do not include newline characters inside strings.
                        Keep all values short.
                        EXACT STRUCTURE:
                        {
                          "summary": "Short summary.",
                          "prioritySkills": [
                            "skill 1",
                            "skill 2",
                            "skill 3"
                          ],
                          "interviewTopics": [
                            "topic 1",
                            "topic 2",
                            "topic 3"
                          ],
                          "preparationPlan": [
                            "step 1",
                            "step 2",
                            "step 3",
                            "step 4"
                          ]
                        }
                """;
        }

        // ============================================================
        // CONTEXT
        // ============================================================

        private List<String> buildContext(CareerIntelligenceResponse intelligence) {

                List<String> context = new ArrayList<>();

                context.add("TARGET ROLE: " + safe(intelligence.role()));
                context.add("TARGET LOCATION: " + safe(intelligence.location()));
                context.add("JOBS ANALYZED: " + intelligence.jobsAnalyzed());
                context.add("MARKET SKILLS: " + formatSkills(intelligence.marketSkills()));
                context.add("TOP COMPANIES: " + formatList(intelligence.topCompanies()));
                context.add("TOP LOCATIONS: " + formatList(intelligence.topLocations()));

                return context;
        }

        // ============================================================
        // USER PROMPT
        // ============================================================

        private String buildUserPrompt(CareerIntelligenceResponse intelligence) {

                return """
                        Analyze the current market for:
                        Role: %s
                        Location: %s
                        Using only the supplied market data:
                        1. Select the most important skills.
                        2. Identify practical interview topics.
                        3. Create a short preparation roadmap.
                        4. Give a concise market summary.
                        Return ONLY the required JSON object.
                """.formatted(safe(intelligence.role()), safe(intelligence.location()));
        }

        // ============================================================
        // RETRY USER PROMPT
        // ============================================================

        private String buildRetryUserPrompt() {

                return """
                        Generate the Career Intelligence JSON again.
                        Make sure the JSON is complete.
                        Before returning the response, internally verify:
                        - JSON starts with {
                        - JSON ends with }
                        - every key has a value
                        - every string has closing quotes
                        - every array is closed
                        - no Markdown is included
                        Return ONLY JSON.
                """;
        }

        // ============================================================
        // PARSE RESPONSE
        // ============================================================

        private CareerAiAnalysis parseResponse(String content) {

                try {

                        String cleaned = cleanJson(content);

                        if (cleaned.isBlank()) {
                                throw new IllegalStateException("Career AI returned an empty response");
                        }

                        log.debug("Career AI response:\n{}", cleaned);

                        JsonNode json = objectMapper.readTree(cleaned);

                        if (json == null || !json.isObject()) {
                                throw new IllegalStateException("Career AI did not return a JSON object");
                        }

                        String summary = json.path("summary")
                                        .asText("")
                                        .trim();

                        List<String> prioritySkills = readStringList(
                                        json,
                                        "prioritySkills");

                        List<String> interviewTopics = readStringList(
                                        json,
                                        "interviewTopics");

                        List<String> preparationPlan = readStringList(
                                        json,
                                        "preparationPlan");

                        return new CareerAiAnalysis(
                                        summary,
                                        prioritySkills,
                                        interviewTopics,
                                        preparationPlan);

                } catch (Exception e) {

                        log.error("Failed to parse Career AI response.\n" + "Raw response:\n{}",
                                        content,
                                        e);

                        throw new IllegalStateException("Failed to parse Career AI response", e);
                }
        }

        // ============================================================
        // READ STRING LIST
        // ============================================================

        private List<String> readStringList(JsonNode root, String field) {

                List<String> result = new ArrayList<>();

                JsonNode node = root.path(field);

                if (!node.isArray()) {
                        return result;
                }

                for (JsonNode item : node) {

                        if (item.isTextual()) {

                                String value = item.asText().trim();

                                if (!value.isBlank()) {
                                        result.add(value);
                                }
                        }
                }

                return result;
        }

        // ============================================================
        // CLEAN JSON
        // ============================================================

        private String cleanJson(
                        String content) {

                if (content == null) {
                        throw new IllegalStateException("AI returned empty content");
                }

                String cleaned = content.trim();

                if (cleaned.startsWith("```json")) {

                        cleaned = cleaned.substring(7);

                } else if (cleaned.startsWith("```")) {

                        cleaned = cleaned.substring(3);
                }

                if (cleaned.endsWith("```")) {

                        cleaned = cleaned.substring(0, cleaned.length() - 3);
                }

                return cleaned.trim();
        }

        // ============================================================
        // FORMAT HELPERS
        // ============================================================

        private String formatSkills(List<SkillDemand> skills) {

                if (skills == null || skills.isEmpty()) {
                        return "No skill data available";
                }

                return skills.stream()
                                .limit(15)
                                .map(skill -> skill.skill()
                                                + " ("
                                                + skill.jobCount()
                                                + " jobs, "
                                                + skill.percentage()
                                                + "%)")
                                .reduce((a, b) -> a + ", " + b)
                                .orElse("");
        }

        private String formatList(
                        List<String> values) {

                if (values == null || values.isEmpty()) {
                        return "None";
                }

                return values.stream()
                                .limit(10)
                                .map(this::safe)
                                .reduce((a, b) -> a + ", " + b)
                                .orElse("None");
        }

        private String safe(String value) {

                return value == null ? "" : value.trim();
        }
}