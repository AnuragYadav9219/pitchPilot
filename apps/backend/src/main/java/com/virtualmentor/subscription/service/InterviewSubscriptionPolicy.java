package com.virtualmentor.subscription.service;

import org.springframework.stereotype.Component;

import com.virtualmentor.conversation.entity.InterviewMode;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionLimit;

@Component
public class InterviewSubscriptionPolicy {

    public Entitlement entitlementFor(InterviewMode mode) {

        return switch (mode) {
            case TEXT ->
                Entitlement.TEXT_INTERVIEW;

            case VOICE ->
                Entitlement.VOICE_INTERVIEW;
        };
    }

    public SubscriptionLimit limitFor(InterviewMode mode) {

        return switch (mode) {
            case TEXT ->
                SubscriptionLimit.TEXT_INTERVIEWS;

            case VOICE ->
                SubscriptionLimit.VOICE_INTERVIEWS;
        };
    }
}
