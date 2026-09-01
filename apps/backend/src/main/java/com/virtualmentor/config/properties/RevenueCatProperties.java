package com.virtualmentor.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "revenuecat")
public record RevenueCatProperties(

                String baseUrl,

                String projectId,

                String secretKey,
                
                String webhookSecret) {

}
