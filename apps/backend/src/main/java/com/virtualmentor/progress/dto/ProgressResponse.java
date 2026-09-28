package com.virtualmentor.progress.dto;

import java.util.List;

public record ProgressResponse(
                double overallScore,
                double previousScore,
                double improvementPercentage,

                int totalInterviews,
                int completedInterviews,
                double highestScore,

                int currentStreak,
                int longestStreak,

                int weeklyInterviews,
                int monthlyInterviews,

                List<SkillProgress> skills,
                List<ScoreTrendPoint> scoreTrend,
                List<InterviewProgressItem> interviewHistory,

                List<String> strengths,
                List<String> areasToImprove,

                FocusArea focusArea,
                GoalProgress weeklyGoal) {
}