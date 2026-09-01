package com.virtualmentor.subscription.mapper;

import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.SubscriptionPlan;

@Component
public class RevenueCatPlanMapper {

    public SubscriptionPlan toPlan(String entitlementId) {

        return switch (entitlementId) {

            case "virtualmentor_pro" ->
                SubscriptionPlan.PRO;

            case "virtualmentor_premium" ->
                SubscriptionPlan.PREMIUM;

            default ->
                SubscriptionPlan.FREE;
        };
    }
}
