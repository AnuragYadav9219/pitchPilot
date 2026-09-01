package com.virtualmentor.ai.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.virtualmentor.ai.provider.gemini.GeminiProperties;

@Configuration
@EnableConfigurationProperties({
                AiProperties.class,
                GeminiProperties.class
})
public class AiConfiguration {

}
