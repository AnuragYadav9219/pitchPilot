package com.virtualmentor.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.virtualmentor.config.properties.RevenueCatProperties;

@Configuration
@EnableConfigurationProperties(RevenueCatProperties.class)
public class RevenueCatConfig {

}
