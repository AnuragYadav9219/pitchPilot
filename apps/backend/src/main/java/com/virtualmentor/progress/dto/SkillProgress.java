package com.virtualmentor.progress.dto;

public record SkillProgress(
        String name,
        double currentScore,
        double previousScore,
        double improvementPercentage) {
}