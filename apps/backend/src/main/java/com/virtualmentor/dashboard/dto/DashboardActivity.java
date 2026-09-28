package com.virtualmentor.dashboard.dto;

import java.time.LocalDate;

public record DashboardActivity(
        LocalDate date,
        int count) {
}
