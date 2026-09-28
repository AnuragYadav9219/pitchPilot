package com.virtualmentor.ai.provider;

import com.virtualmentor.ai.model.AiRequest;
import com.virtualmentor.ai.model.AiResponse;

public interface  AiProvider {
    
    AiResponse generate(AiRequest request);
}
