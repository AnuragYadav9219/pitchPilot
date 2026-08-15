package com.virtualmento.ai.context;

import java.util.List;

import com.virtualmento.ai.provider.AiRequest;

public record ConversationContext(

        String systemInstruction,

        List<AiRequest.AiMessage> messages) {

}
