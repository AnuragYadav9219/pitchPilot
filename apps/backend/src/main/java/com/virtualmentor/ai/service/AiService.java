package com.virtualmentor.ai.service;

import com.virtualmentor.ai.provider.AiRequest;
import com.virtualmentor.ai.provider.AiResponse;

public interface AiService {

    AiResponse generate(
            AiRequest request);
}
