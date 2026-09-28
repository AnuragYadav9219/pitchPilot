package com.virtualmentor.progress.dto;

import java.time.LocalDate;

public record ScoreTrendPoint(
        LocalDate date,
        double score
) {
}