package com.virtualmentor.credit.service;

import org.springframework.stereotype.Service;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.config.properties.FeatureCreditsProperties;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeatureCreditCostServiceImpl implements FeatureCreditCostService {

    private final FeatureCreditsProperties properties;

    @Override
    public long getCost(Feature feature) {
        
        return switch (feature) {

             case VOICE_INTERVIEW ->
                    properties.getVoiceInterview().credits();

            case RESUME_ANALYSIS ->
                    properties.getResumeAnalysis().credits();

            case JOB_ANALYSIS ->
                    properties.getJobAnalysis().credits();

            default ->  0;
        };
    }
}
