package com.virtualmentor.career.dto;

import java.util.List;

public record CareerAnalysisResponse(
        String role,
        String location,
        int jobsAnalyzed,
        List<SkillDemand> marketSkills,
        List<String> topCompanies,
        List<String> topLocations,
        CareerAiAnalysis aiAnalysis) {
}