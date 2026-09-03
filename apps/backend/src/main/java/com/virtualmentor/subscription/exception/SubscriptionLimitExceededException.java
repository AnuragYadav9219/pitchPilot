package com.virtualmentor.subscription.exception;

public class SubscriptionLimitExceededException extends RuntimeException {

    public SubscriptionLimitExceededException(String message) {
        super(message);
    }

}
