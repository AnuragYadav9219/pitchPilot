package com.virtualmentor.dashboard.dto;

import java.time.LocalDateTime;

public record RecentInterviewResponse(
        Long id,
        String role,
        String type,
        String difficulty,
        double score,
        String status,
        LocalDateTime completedAt) {
}