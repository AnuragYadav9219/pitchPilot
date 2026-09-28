package com.virtualmentor.ai.context;

public record InterviewAiContext(

                UserAiContext user,

                String role,

                String interviewType,

                String difficulty,

                String topics,

                Integer durationMinutes

) {
}