package com.virtualmentor.career.dto;

import java.util.List;

public record CareerIntelligenceResponse(
        String role,
        String location,
        int jobsAnalyzed,
        List<SkillDemand> marketSkills,
        List<String> topCompanies,
        List<String> topLocations
) {
}