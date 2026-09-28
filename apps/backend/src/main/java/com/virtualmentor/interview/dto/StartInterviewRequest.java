package com.virtualmentor.interview.dto;

import com.virtualmentor.interview.enums.InterviewDifficulty;
import com.virtualmentor.interview.enums.InterviewType;
import jakarta.validation.constraints.*;

public record StartInterviewRequest(

        @NotBlank(message = "Role is required")
        @Size(max = 150)
        String role,

        @NotNull(message = "Interview type is required")
        InterviewType type,

        @NotNull(message = "Difficulty is required")
        InterviewDifficulty difficulty,

        @Size(max = 2000)
        String topics,

        @NotNull(message = "Duration is required")
        @Min(value = 5, message = "Minimum duration is 5 minutes")
        @Max(value = 120, message = "Maximum duration is 120 minutes")
        Integer durationMinutes

) {
}