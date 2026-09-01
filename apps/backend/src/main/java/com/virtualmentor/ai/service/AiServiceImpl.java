package com.virtualmentor.ai.service;

import org.springframework.stereotype.Service;

import com.virtualmentor.ai.config.AiProperties;
import com.virtualmentor.ai.provider.AiProvider;
import com.virtualmentor.ai.provider.AiRequest;
import com.virtualmentor.ai.provider.AiResponse;
import com.virtualmentor.ai.provider.AiProviderType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AiServiceImpl
                implements AiService {

        private final AiProviderRegistry providerRegistry;
        private final AiProperties aiProperties;

        @Override
        public AiResponse generate(AiRequest request) {

                AiProviderType providerType = request.provider() != null
                                ? request.provider()
                                : aiProperties.getDefaultProvider();

                AiProvider provider = providerRegistry.get(providerType);

                System.out.println(
                                "AI REQUEST -> provider=" + providerType
                                                + ", model=" + request.model());

                AiResponse response = provider.generate(request);

                System.out.println(
                                "AI RESPONSE -> provider=" + response.provider()
                                                + ", model=" + response.model());

                return response;
        }
}