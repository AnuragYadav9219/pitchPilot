package com.virtualmentor.evaluation.provider.gemini;

import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.virtualmentor.ai.model.AiRequest;
import com.virtualmentor.ai.model.AiResponse;
import com.virtualmentor.ai.provider.AiProvider;
import com.virtualmentor.conversation.entity.ConversationMessage;
import com.virtualmentor.evaluation.provider.EvaluationProvider;
import com.virtualmentor.evaluation.provider.model.EvaluationResult;
import com.virtualmentor.interview.entity.Interview;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GeminiEvaluationProvider
        implements EvaluationProvider {

    private final AiProvider aiProvider;

    private final ObjectMapper objectMapper;

    private static final String SYSTEM_PROMPT = """
            You are VirtualMentor's interview evaluation engine.

            Evaluate a completed mock interview using only
            the supplied interview conversation.

            Never invent candidate information.

            Overall score:
            0-100.

            Category scores:
            0-100.

            Question scores:
            0-10.

            Evaluate:
            - technical knowledge
            - communication
            - problem solving
            - confidence
            - correctness
            - relevance
            - completeness
            - clarity

            Return ONLY valid JSON.
            """;

    @Override
    public EvaluationResult evaluate(
            Interview interview,
            List<ConversationMessage> messages) {

        String prompt = buildEvaluationPrompt(interview, messages);

        AiResponse response = aiProvider.generate(
                new AiRequest(
                        SYSTEM_PROMPT,
                        prompt,
                        List.of()));

        if (response == null) {
            throw new IllegalStateException("AI provider returned null response");
        }

        if (response.content() == null || response.content().isBlank()) {
            throw new IllegalStateException("AI provider returned empty response");
        }

        try {

            String json = cleanJson(response.content());

            return objectMapper.readValue(
                    json,
                    EvaluationResult.class);

        } catch (Exception e) {

            throw new IllegalStateException(
                    "Failed to parse Gemini evaluation response",
                    e);
        }
    }

    // ==============================================================
    // PRIVATE METHODS
    // ==============================================================

    private String cleanJson(String content) {

        String json = content.trim();

        if (json.startsWith("```json")) {
            json = json.substring(7);
        } else if (json.startsWith("```")) {
            json = json.substring(3);
        }

        if (json.endsWith("```")) {
            json = json.substring(
                    0,
                    json.length() - 3);
        }

        return json.trim();
    }

    private String buildEvaluationPrompt(
            Interview interview,
            List<ConversationMessage> messages) {

        StringBuilder conversation = new StringBuilder();

        for (ConversationMessage message : messages) {

            conversation
                    .append(message.getRole().name())
                    .append(": ")
                    .append(message.getContent())
                    .append("\n\n");
        }

        return """
                You are an expert technical interviewer
                evaluating a completed mock interview.

                Evaluate the candidate based ONLY on the
                interview conversation provided below.

                Interview information:

                Role: %s

                Interview Type: %s

                Difficulty: %s

                Topics: %s

                Duration: %s minutes


                Conversation:

                %s


                Evaluation requirements:

                1. Give an overall score from 0 to 100.

                2. Give these category scores from 0 to 100:
                   - technicalScore
                   - communicationScore
                   - problemSolvingScore
                   - confidenceScore

                3. Provide a concise overall summary.

                4. Identify concrete strengths.

                5. Identify concrete areas for improvement.

                6. Give actionable recommendations.

                7. Evaluate each interviewer question
                   and the candidate's corresponding answer.

                8. Do not invent information that is not
                   present in the conversation.

                9. Judge the candidate's answers based on
                   relevance, correctness, clarity,
                   reasoning and completeness.

                10. Return ONLY valid JSON matching the
                    requested schema.

                Return exactly this JSON structure:

                {
                  "overallScore": 0,
                  "technicalScore": 0,
                  "communicationScore": 0,
                  "problemSolvingScore": 0,
                  "confidenceScore": 0,
                  "summary": "",
                  "strengths": [],
                  "areasToImprove": [],
                  "recommendations": [],
                  "questions": [
                    {
                      "questionNumber": 1,
                      "question": "",
                      "userAnswer": "",
                      "score": 0,
                      "feedback": ""
                    }
                  ]
                }
                """.formatted(
                interview.getRole(),
                interview.getType(),
                interview.getDifficulty(),
                interview.getTopics() == null
                        ? ""
                        : interview.getTopics(),
                interview.getDurationMinutes(),
                conversation);
    }
}