package com.virtualmento.ai.config;

import java.net.http.HttpClient;
import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
public class AiHttpConfiguration {

    @Bean
    public RestClient.Builder restClientBuilder() {

        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(20))
                .build();

        JdkClientHttpRequestFactory factory = new JdkClientHttpRequestFactory(httpClient);

        factory.setReadTimeout(
                Duration.ofSeconds(120));

        return RestClient.builder()
                .requestFactory(factory);
    }
}