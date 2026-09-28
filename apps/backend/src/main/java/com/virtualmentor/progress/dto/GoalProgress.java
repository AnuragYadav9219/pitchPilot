package com.virtualmentor.progress.dto;

public record GoalProgress(
        int completed,
        int target,
        double percentage) {
}