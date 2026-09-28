package com.virtualmentor.billing.service;

import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionLimit;

@Component
public class FeatureBillingConfigImpl implements FeatureBillingConfig {

    private static final Map<Feature, SubscriptionLimit> LIMITS = Map.of(
            Feature.VOICE_INTERVIEW,
            SubscriptionLimit.VOICE_INTERVIEWS,

            Feature.RESUME_ANALYSIS,
            SubscriptionLimit.RESUME_ANALYSES,

            Feature.JOB_SEARCH,
            SubscriptionLimit.JOB_SEARCHES);

    private static final Map<Feature, Entitlement> ENTITLEMENTS = Map.of(
            Feature.VOICE_INTERVIEW,
            Entitlement.VOICE_INTERVIEW,

            Feature.RESUME_ANALYSIS,
            Entitlement.RESUME_ANALYSIS);

    private static final Set<Feature> CREDIT_FEATURES = Set.of(
            Feature.VOICE_INTERVIEW,
            Feature.RESUME_ANALYSIS,
            Feature.JOB_ANALYSIS);

    @Override
    public SubscriptionLimit getLimit(Feature feature) {

        SubscriptionLimit limit = LIMITS.get(feature);

        if (limit == null) {
            throw new IllegalArgumentException(
                    "No subscription limit configured for feature: " + feature);
        }

        return limit;
    }

    @Override
    public Entitlement getEntitlement(Feature feature) {

        Entitlement entitlement = ENTITLEMENTS.get(feature);

        if (entitlement == null) {
            throw new IllegalArgumentException(
                    "No entitlement configured for feature: " + feature);
        }

        return entitlement;
    }

    @Override
    public boolean hasLimit(Feature feature) {
        return LIMITS.containsKey(feature);
    }

    @Override
    public boolean requiresEntitlement(Feature feature) {
        return ENTITLEMENTS.containsKey(feature);
    }

    @Override
    public boolean usesCredits(Feature feature) {
        return CREDIT_FEATURES.contains(feature);
    }
}