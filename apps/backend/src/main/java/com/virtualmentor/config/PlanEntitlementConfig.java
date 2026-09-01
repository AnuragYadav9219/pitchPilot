package com.virtualmentor.config;

import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionPlan;

@Component
public class PlanEntitlementConfig {

        private final Map<SubscriptionPlan, Set<Entitlement>> entitlements = Map.of(
                        SubscriptionPlan.FREE,
                        Set.of(Entitlement.TEXT_INTERVIEW),

                        SubscriptionPlan.PRO,
                        Set.of(
                                        Entitlement.TEXT_INTERVIEW,
                                        Entitlement.VOICE_INTERVIEW,
                                        Entitlement.ADVANCED_ANALYTICS),

                        SubscriptionPlan.PREMIUM,
                        Set.of(
                                        Entitlement.TEXT_INTERVIEW,
                                        Entitlement.VOICE_INTERVIEW,
                                        Entitlement.ADVANCED_ANALYTICS,
                                        Entitlement.RESUME_ANALYSIS));

        public boolean hasEntitlement(
                        SubscriptionPlan plan,
                        Entitlement entitlement) {

                return entitlements
                                .getOrDefault(plan, Set.of())
                                .contains(entitlement);
        }

        public Set<Entitlement> getEntitlements(
                        SubscriptionPlan plan) {

                return entitlements.getOrDefault(
                                plan,
                                Set.of());
        }
}
