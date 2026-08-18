package com.virtualmento.progress.dto;

import java.time.Instant;
import java.util.List;

public record ProgressResponse(
        ScoreSummary overall,
        SkillScores skills,
        List<TrendPoint> trend,
        SkillInsight strongestSkill,
        SkillInsight needsAttention) {

    public record ScoreSummary(
            Integer current,
            Integer previous,
            Double change) {
    }

    public record SkillScores(
            Integer communication,
            Integer clarity,
            Integer confidence,
            Integer relevance) {
    }

    public record TrendPoint(
            int sessionNumber,
            Integer score,
            Instant completedAt) {
    }

    public record SkillInsight(
            String name,
            Integer score) {
    }
}
