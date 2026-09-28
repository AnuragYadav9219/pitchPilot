package com.virtualmentor.career.dto;

import jakarta.validation.constraints.NotBlank;

public record JobSearchRequest(

        @NotBlank(message = "Job query is required")
        String query,

        @NotBlank(message = "Location is required")
        String location
) {
}