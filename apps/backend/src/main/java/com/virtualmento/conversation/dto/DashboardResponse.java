package com.virtualmento.conversation.dto;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record DashboardResponse(
        long totalSessions,
        long completedSessions,
        Integer averageScore,
        Integer bestScore,
        Integer averageCommunicationScore,
        Integer averageClarityScore,
        Integer averageConfidenceScore,
        Integer averageRelevanceScore,
        List<RecentSession> recentSessions) {

    public record RecentSession(
            UUID conversationId,
            String title,
            String type,
            Integer score,
            Instant completedAt) {
    }
}