package com.virtualmentor.career.dto;

import java.util.List;

public record CareerAiAnalysis(
        String summary,
        List<String> prioritySkills,
        List<String> interviewTopics,
        List<String> preparationPlan) {
}