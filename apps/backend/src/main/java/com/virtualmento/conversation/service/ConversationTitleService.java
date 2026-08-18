package com.virtualmento.conversation.service;

import org.springframework.stereotype.Service;

@Service
public class ConversationTitleService {

    private static final int MAX_TITLE_LENGTH = 70;

    public String generateFromMessage(
            String message) {
        if (message == null ||
                message.isBlank()) {

            return "Practice Session";
        }

        String title = message
                .trim()
                .replaceAll("\\s+", " ");

        /*
         * Remove common conversational openings.
         */
        title = title.replaceFirst(
                "(?i)^(hi|hello|hey|please|can you|i want to|i need to)\\s+",
                "");

        if (title.isBlank()) {
            return "Practice Session";
        }

        /*
         * Convert the first sentence into a
         * readable history title.
         */
        int sentenceEnd = findSentenceEnd(title);

        if (sentenceEnd > 0) {
            title = title.substring(
                    0,
                    sentenceEnd);
        }

        if (title.length() > MAX_TITLE_LENGTH) {

            title = title.substring(
                    0,
                    MAX_TITLE_LENGTH).trim();

            int lastSpace = title.lastIndexOf(' ');

            if (lastSpace > 20) {
                title = title.substring(
                        0,
                        lastSpace);
            }

            title += "...";
        }

        return capitalize(title);
    }

    private int findSentenceEnd(
            String text) {
        int dot = text.indexOf('.');

        int question = text.indexOf('?');

        int exclamation = text.indexOf('!');

        int result = -1;

        if (dot >= 0) {
            result = dot;
        }

        if (question >= 0 &&
                (result < 0 ||
                        question < result)) {
            result = question;
        }

        if (exclamation >= 0 &&
                (result < 0 ||
                        exclamation < result)) {
            result = exclamation;
        }

        return result >= 0
                ? result
                : -1;
    }

    private String capitalize(
            String value) {
        if (value.isEmpty()) {
            return value;
        }

        return Character.toUpperCase(
                value.charAt(0)) + value.substring(1);
    }
}