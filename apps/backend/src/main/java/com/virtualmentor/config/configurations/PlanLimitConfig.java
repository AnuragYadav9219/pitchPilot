package com.virtualmentor.config.configurations;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionPlan;

@Component
public class PlanLimitConfig {

        public static final int UNLIMITED = -1;

        private final Map<SubscriptionPlan, Map<SubscriptionLimit, Integer>> limits = Map.of(

                        SubscriptionPlan.FREE,
                        Map.of(
                                        SubscriptionLimit.VOICE_INTERVIEWS, 1,
                                        SubscriptionLimit.RESUME_ANALYSES, 0,
                                        SubscriptionLimit.JOB_SEARCHES, 10),

                        SubscriptionPlan.PRO,
                        Map.of(
                                        SubscriptionLimit.VOICE_INTERVIEWS, 20,
                                        SubscriptionLimit.RESUME_ANALYSES, 2,
                                        SubscriptionLimit.JOB_SEARCHES, 100),

                        SubscriptionPlan.PREMIUM,
                        Map.of(
                                        SubscriptionLimit.VOICE_INTERVIEWS, UNLIMITED,
                                        SubscriptionLimit.RESUME_ANALYSES, 10,
                                        SubscriptionLimit.JOB_SEARCHES, UNLIMITED));

        public int getLimit(SubscriptionPlan plan, SubscriptionLimit limit) {
                return limits
                                .getOrDefault(plan, Map.of())
                                .getOrDefault(limit, 0);
        }

        public boolean isUnlimited(SubscriptionPlan plan, SubscriptionLimit limit) {
                return getLimit(plan, limit) == UNLIMITED;
        }

        public Map<SubscriptionLimit, Integer> getLimits(
                        SubscriptionPlan plan) {
                return limits.getOrDefault(plan, Map.of());
        }
}