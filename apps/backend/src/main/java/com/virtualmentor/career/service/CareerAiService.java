package com.virtualmentor.career.service;

import com.virtualmentor.career.dto.CareerAiAnalysis;
import com.virtualmentor.career.dto.CareerIntelligenceResponse;

public interface CareerAiService {

    CareerAiAnalysis analyze(CareerIntelligenceResponse intelligence);
}