package com.virtualmentor.progress.dto;

public record FocusArea(
        String skill,
        double score,
        double gapFromOverall,
        String recommendation) {
}