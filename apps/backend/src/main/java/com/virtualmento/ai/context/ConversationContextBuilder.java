package com.virtualmento.ai.context;

import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.entity.MessageRole;

@Component
public class ConversationContextBuilder {

    // =========================================================
    // BUILD CONTEXT
    // =========================================================

    public ConversationContext build(
            UserProfileContext profile,
            String summary,
            List<ConversationMessage> messages) {

        String systemInstruction = buildSystemInstruction(profile, summary);

        List<AiRequest.AiMessage> aiMessages = buildMessages(messages);

        return new ConversationContext(
                systemInstruction,
                aiMessages);
    }

    // =========================================================
    // SYSTEM INSTRUCTION
    // =========================================================

    private String buildSystemInstruction(
            UserProfileContext profile,
            String summary) {

        StringBuilder instruction = new StringBuilder();

        instruction.append("""
                You are VirtualMento, an AI mentor.

                Help the user learn, practice skills,
                prepare for interviews, improve professionally,
                and make better decisions.

                Be clear, constructive, honest and practical.

                Do not pretend to be human.

                Use the conversation history to maintain
                continuity and avoid repeatedly asking for
                information the user has already provided.

                Adapt your explanations, examples,
                difficulty and recommendations according
                to the user's profile.

                USER PROFILE:
                """);

        appendField(
                instruction,
                "Education",
                profile != null
                        ? profile.education()
                        : null);

        appendField(
                instruction,
                "Experience Level",
                profile != null
                        ? profile.experienceLevel()
                        : null);

        appendCollection(
                instruction,
                "Skills",
                profile != null
                        ? profile.skills()
                        : null);

        appendCollection(
                instruction,
                "Interests",
                profile != null
                        ? profile.interests()
                        : null);

        appendField(
                instruction,
                "Career Goal",
                profile != null
                        ? profile.careerGoal()
                        : null);

        appendField(
                instruction,
                "Learning Style",
                profile != null
                        ? profile.learningStyle()
                        : null);

        // -----------------------------------------------------
        // Conversation summary
        // -----------------------------------------------------

        if (summary != null && !summary.isBlank()) {

            instruction.append("""
                    PREVIOUS CONVERSATION SUMMARY:
                    """);

            instruction.append(summary.trim());
        }

        return instruction.toString();
    }

    // =========================================================
    // BUILD AI MESSAGES
    // =========================================================

    private List<AiRequest.AiMessage> buildMessages(List<ConversationMessage> messages) {

        if (messages == null || messages.isEmpty()) {

            return Collections.emptyList();
        }

        return messages.stream()

                .filter(message -> message != null &&
                        message.getContent() != null &&
                        !message.getContent().isBlank())

                .map(message -> new AiRequest.AiMessage(
                        mapRole(message.getRole()),
                        message.getContent()))

                .toList();
    }

    // =========================================================
    // ROLE MAPPING
    // =========================================================

    private String mapRole(
            MessageRole role) {

        if (role == null) {
            return "user";
        }

        return switch (role) {

            case USER ->
                "user";

            case ASSISTANT ->
                "assistant";

            case SYSTEM ->
                "system";
        };
    }

    // =========================================================
    // FIELD
    // =========================================================

    private void appendField(
            StringBuilder builder,
            String name,
            String value) {

        if (value == null || value.isBlank()) {

            return;
        }

        builder.append("\n")
                .append(name)
                .append(": ")
                .append(value.trim());
    }

    // =========================================================
    // COLLECTION
    // =========================================================

    private void appendCollection(
            StringBuilder builder,
            String name,
            Set<String> values) {

        if (values == null || values.isEmpty()) {

            return;
        }

        builder.append("\n")
                .append(name)
                .append(": ")
                .append(
                        String.join(
                                ", ",
                                values));
    }
}