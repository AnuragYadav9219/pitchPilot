package com.virtualmento.ai.service;

import com.virtualmento.ai.provider.AiRequest;
import com.virtualmento.ai.provider.AiResponse;

public interface AiService {

    AiResponse generate(
            AiRequest request);
}
