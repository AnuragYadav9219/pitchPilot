package com.virtualmento.ai.exception;

public class AiProviderRateLimitException
        extends AiProviderException {

    public AiProviderRateLimitException(String message) {

        super(message);
    }
}