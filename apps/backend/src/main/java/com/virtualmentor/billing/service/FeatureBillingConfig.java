package com.virtualmentor.billing.service;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionLimit;

public interface FeatureBillingConfig {

    SubscriptionLimit getLimit(Feature feature);

    Entitlement getEntitlement(Feature feature);

    boolean hasLimit(Feature feature);

    boolean requiresEntitlement(Feature feature);

    boolean usesCredits(Feature feature);
}