package com.virtualmentor.ai.context;

import java.util.List;

import com.virtualmentor.ai.provider.AiRequest;

public record ConversationContext(

                String systemInstruction,

                List<AiRequest.AiMessage> messages) {

}
