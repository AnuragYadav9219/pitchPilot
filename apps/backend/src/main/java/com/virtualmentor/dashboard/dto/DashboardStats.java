package com.virtualmentor.dashboard.dto;

public record DashboardStats(
    long totalInterviews,
    long completedInterviews,
    double averageScore,
    int currentStreak,
    int longestStreak,
    double completionRate,
    double highestScore,
    int totalPracticeMinutes
) {}