package com.virtualmento.ai.context;

import java.util.List;

import org.springframework.stereotype.Component;

import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.entity.MessageRole;

@Component
public class EvaluationTranscriptBuilder {

    public String build(
            List<ConversationMessage> messages) {

        if (messages == null || messages.isEmpty()) {

            return "";
        }

        StringBuilder transcript = new StringBuilder();

        for (ConversationMessage message : messages) {

            String role = resolveRole(
                    message.getRole());

            transcript
                    .append(role)
                    .append(": ")
                    .append(message.getContent())
                    .append("\n\n");
        }

        return transcript.toString().trim();
    }

    private String resolveRole(
            MessageRole role) {

        return switch (role) {

            case USER -> "USER";

            case ASSISTANT -> "MENTOR";

            case SYSTEM -> "SYSTEM";
        };
    }
}