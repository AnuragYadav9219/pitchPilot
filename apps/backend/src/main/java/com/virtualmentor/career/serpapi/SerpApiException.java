package com.virtualmentor.career.serpapi;

public class SerpApiException extends RuntimeException {

    public SerpApiException(String message) {
        super(message);
    }

    public SerpApiException(String message, Throwable cause) {
        super(message, cause);
    }
}