// package com.virtualmento.ai.service;

// import org.springframework.stereotype.Service;

// import com.virtualmento.ai.config.AiProperties;
// import com.virtualmento.ai.exception.AiProviderRateLimitException;
// import com.virtualmento.ai.exception.AiProviderUnavailableException;
// import com.virtualmento.ai.provider.AiProvider;
// import com.virtualmento.ai.provider.AiRequest;
// import com.virtualmento.ai.provider.AiResponse;
// import com.virtualmento.ai.provider.AiProviderType;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class AiServiceImpl
//         implements AiService {

//     private final AiProviderRegistry providerRegistry;
//     private final AiProperties aiProperties;

//     @Override
//     public AiResponse generate(AiRequest request) {

//         AiProviderType providerType = request.provider() != null
//                 ? request.provider()
//                 : aiProperties.getDefaultProvider();

//         AiProvider provider = providerRegistry.get(providerType);

//         int maxAttempts = Math.max(
//                 1,
//                 aiProperties
//                         .getRetry()
//                         .getMaxAttempts());

//         long backoff = aiProperties
//                 .getRetry()
//                 .getBackoffMs();

//         for (int attempt = 1; attempt <= maxAttempts; attempt++) {

//             try {

//                 return provider.generate(request);

//             } catch (AiProviderRateLimitException ex) {

//                 // Don't blindly retry rate limits.
//                 throw ex;

//             } catch (AiProviderUnavailableException ex) {

//                 if (attempt == maxAttempts) {
//                     throw ex;
//                 }

//                 sleep(backoff);
//             }
//         }

//         throw new AiProviderUnavailableException("AI provider unavailable");
//     }

//     private void sleep(long milliseconds) {

//         try {

//             Thread.sleep(milliseconds);

//         } catch (InterruptedException ex) {

//             Thread.currentThread().interrupt();

//             throw new AiProviderUnavailableException(
//                     "AI request interrupted",
//                     ex);
//         }
//     }
// }





















package com.virtualmento.ai.service;

import org.springframework.stereotype.Service;

import com.virtualmento.ai.config.AiProperties;
import com.virtualmento.ai.exception.AiProviderRateLimitException;
import com.virtualmento.ai.exception.AiProviderUnavailableException;
import com.virtualmento.ai.provider.AiProvider;
import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;
import com.virtualmento.ai.provider.AiProviderType;

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
    private void sleep(long milliseconds) {

        try {

            Thread.sleep(milliseconds);

        } catch (InterruptedException ex) {

            Thread.currentThread().interrupt();

            throw new AiProviderUnavailableException(
                    "AI request interrupted",
                    ex);
        }
    }
}