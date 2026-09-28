package com.virtualmentor.history.dto;

import java.time.LocalDateTime;

import com.virtualmentor.evaluation.enums.EvaluationStatus;
import com.virtualmentor.interview.enums.InterviewDifficulty;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.enums.InterviewType;

public record HistoryItemResponse(

        Long interviewId,

        String role,

        String topics,

        InterviewType type,

        InterviewDifficulty difficulty,

        InterviewStatus status,

        Double score,

        EvaluationStatus evaluationStatus,

        Integer durationMinutes,

        LocalDateTime startedAt,

        LocalDateTime completedAt,

        LocalDateTime createdAt

) {
}