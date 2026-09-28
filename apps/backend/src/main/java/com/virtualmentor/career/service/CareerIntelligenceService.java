package com.virtualmentor.career.service;

import java.util.UUID;

import com.virtualmentor.career.dto.CareerAnalysisResponse;
import com.virtualmentor.career.dto.CareerIntelligenceResponse;

public interface CareerIntelligenceService {

        CareerIntelligenceResponse analyze(
                        UUID userId,
                        String role,
                        String location);

        CareerAnalysisResponse analyzeWithAi(
                        UUID userId,
                        String role,
                        String location);
}