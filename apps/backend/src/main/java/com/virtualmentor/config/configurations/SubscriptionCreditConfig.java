package com.virtualmentor.config.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.virtualmentor.subscription.entity.SubscriptionPlan;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "virtualmentor.subscriptions")
@Getter
@Setter
public class SubscriptionCreditConfig {

    private PlanConfig free = new PlanConfig();
    private PlanConfig pro = new PlanConfig();
    private PlanConfig premium = new PlanConfig();

    public long getMonthlyCredits(SubscriptionPlan plan) {

        return switch (plan) {
            case FREE -> free.getMonthlyCredits();
            case PRO -> pro.getMonthlyCredits();
            case PREMIUM -> premium.getMonthlyCredits();
        };
    }

    @Getter
    @Setter
    public static class PlanConfig {
        private long monthlyCredits;
    }
}
