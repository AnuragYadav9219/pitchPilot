package com.virtualmentor.config;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionPlan;

@Component
public class PlanLimitConfig {

    private static final int UNLIMITED = -1;

    private final Map<SubscriptionPlan, Map<SubscriptionLimit, Integer>> limits = Map.of(
            SubscriptionPlan.FREE,
            Map.of(
                    SubscriptionLimit.TEXT_INTERVIEWS, 5,
                    SubscriptionLimit.VOICE_INTERVIEWS, 0,
                    SubscriptionLimit.RESUME_ANALYSES, 0),

            SubscriptionPlan.PRO,
            Map.of(
                    SubscriptionLimit.TEXT_INTERVIEWS, UNLIMITED,
                    SubscriptionLimit.VOICE_INTERVIEWS, 20,
                    SubscriptionLimit.RESUME_ANALYSES, 0),

            SubscriptionPlan.PREMIUM,
            Map.of(
                    SubscriptionLimit.TEXT_INTERVIEWS, UNLIMITED,
                    SubscriptionLimit.VOICE_INTERVIEWS, UNLIMITED,
                    SubscriptionLimit.RESUME_ANALYSES, 5));

    public int getLimit(SubscriptionPlan plan, SubscriptionLimit limit) {

        return limits
                .getOrDefault(plan, Map.of())
                .getOrDefault(limit, 0);
    }
}
