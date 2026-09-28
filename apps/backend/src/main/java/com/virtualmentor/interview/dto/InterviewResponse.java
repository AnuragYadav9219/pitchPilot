package com.virtualmentor.interview.dto;

import java.time.LocalDateTime;

import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewDifficulty;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.enums.InterviewType;

public record InterviewResponse(

        Long id,

        InterviewType type,

        InterviewDifficulty difficulty,

        InterviewStatus status,

        String role,

        String topics,

        Integer durationMinutes,

        String voiceProvider,

        LocalDateTime startedAt,

        LocalDateTime completedAt,

        LocalDateTime createdAt

) {

    public static InterviewResponse from(Interview interview) {

        return new InterviewResponse(
                interview.getId(),
                interview.getType(),
                interview.getDifficulty(),
                interview.getStatus(),
                interview.getRole(),
                interview.getTopics(),
                interview.getDurationMinutes(),
                interview.getVoiceProvider(),
                interview.getStartedAt(),
                interview.getCompletedAt(),
                interview.getCreatedAt());
    }

}