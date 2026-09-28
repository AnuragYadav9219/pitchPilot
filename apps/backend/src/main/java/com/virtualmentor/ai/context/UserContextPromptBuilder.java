package com.virtualmentor.ai.context;

import org.springframework.stereotype.Component;

@Component
public class UserContextPromptBuilder {

    public String build(UserAiContext context) {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                    USER PROFILE
                    The following information is known about the user.
                    Treat it as persistent user context.
                """);

        append(prompt, "Name", context.fullName());
        append(prompt, "Bio", context.bio());
        append(prompt, "Education", context.education());

        if (context.experienceLevel() != null) {
            append(prompt, "Experience Level", context.experienceLevel().name());
        }

        if (!context.skills().isEmpty()) {
            append(prompt, "Skills", String.join(", ", context.skills()));
        }

        if (!context.interests().isEmpty()) {
            append(prompt, "Interests", String.join(", ", context.interests()));
        }

        append(prompt, "Career Goal", context.careerGoal());

        if (context.learningStyle() != null) {
            append(prompt, "Learning Style", context.learningStyle().name());
        }

        prompt.append("""

                 === PROFILE USAGE RULES ===

                - Do not ask for information that already exists
                  in the user profile.

                - Do not ask the user's name if it is known.

                - Do not ask about experience level if it is known.

                - Do not ask what skills the user has when their
                  skills are already available.

                - Personalize questions and explanations using
                  relevant profile information.

                - Do not mention that you received a database
                  profile unless necessary.

                - Never invent missing profile information.

                - Ask for information only when it is genuinely
                  required for the current task.

                """);

        return prompt.toString();
    }

    private void append(
            StringBuilder prompt,
            String label,
            String value) {

        if (value == null || value.isBlank()) {
            return;
        }

        prompt.append(label)
                .append(": ")
                .append(value)
                .append("\n");
    }
}
