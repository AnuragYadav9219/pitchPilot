package com.virtualmentor.career.dto;

import java.util.List;

public record JobSearchResponse(
        String query,
        String location,
        int totalResults,
        List<JobResult> jobs) {
}