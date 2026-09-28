package com.virtualmentor.progress.dto;

import java.time.LocalDateTime;

public record InterviewProgressItem(
        Long interviewId,
        String role,
        double score,
        LocalDateTime completedAt) {
}