package com.virtualmentor.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.virtualmentor.config.configurations.FeatureCreditConfig;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "virtualmentor.features")
@Getter
@Setter
public class FeatureCreditsProperties {

    private FeatureCreditConfig voiceInterview = new FeatureCreditConfig(0);

    private FeatureCreditConfig resumeAnalysis = new FeatureCreditConfig(0);

    private FeatureCreditConfig jobAnalysis = new FeatureCreditConfig(0);
}