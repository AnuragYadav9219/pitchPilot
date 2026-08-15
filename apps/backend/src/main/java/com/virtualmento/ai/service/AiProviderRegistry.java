package com.virtualmento.ai.service;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.virtualmento.ai.provider.AiProvider;
import com.virtualmento.ai.provider.AiProviderType;

@Component
public class AiProviderRegistry {

    private final Map<AiProviderType, AiProvider> providers = new EnumMap<>(AiProviderType.class);

    public AiProviderRegistry(List<AiProvider> providerList) {

        for (AiProvider provider : providerList) {

            AiProvider previous = providers.put(
                    provider.getType(),
                    provider);

            if (previous != null) {
                throw new IllegalStateException("Duplicate AI provider: " + provider.getType());
            }
        }
    }

    public AiProvider get(AiProviderType type) {

        AiProvider provider = providers.get(type);

        if (provider == null) {
            throw new IllegalStateException("AI provider not configured: " + type);
        }

        return provider;
    }
}
