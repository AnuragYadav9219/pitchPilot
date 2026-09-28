package com.virtualmentor.subscription.service;

import java.time.YearMonth;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.config.configurations.PlanLimitConfig;
import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionUsage;
import com.virtualmentor.subscription.exception.SubscriptionLimitExceededException;
import com.virtualmentor.subscription.repository.SubscriptionUsageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionLimitServiceImpl implements SubscriptionLimitService {

        private final SubscriptionService subscriptionService;
        private final SubscriptionUsageRepository usageRepository;
        private final PlanLimitConfig planLimitConfig;

        @Override
        @Transactional(readOnly = true)
        public boolean canUse(UUID userId, SubscriptionLimit limit) {

                SubscriptionPlan effectivePlan = subscriptionService.getEffectivePlan(userId);

                int max = planLimitConfig.getLimit(effectivePlan, limit);

                if (max == PlanLimitConfig.UNLIMITED) {
                        return true;
                }

                int used = getUsed(userId, limit);

                return used < max;
        }

        @Override
        @Transactional
        public void consume(UUID userId, SubscriptionLimit limit) {

                SubscriptionPlan effectivePlan = subscriptionService.getEffectivePlan(userId);

                int max = planLimitConfig.getLimit(effectivePlan, limit);

                // Unlimited feature
                if (max == PlanLimitConfig.UNLIMITED) {
                        return;
                }

                String usageMonth = YearMonth.now().toString();

                SubscriptionUsage usage = usageRepository
                                .findForUpdate(userId, limit, usageMonth)
                                .orElseGet(() -> createUsage(userId, limit, usageMonth));

                if (usage.getUsageCount() >= max) {
                        throw new SubscriptionLimitExceededException("Monthly "
                                        + formatLimitName(limit)
                                        + " limit reached");
                }

                usage.setUsageCount(usage.getUsageCount() + 1);

                usageRepository.save(usage);
        }

        @Override
        @Transactional(readOnly = true)
        public int getLimit(UUID userId, SubscriptionLimit limit) {

                SubscriptionPlan effectivePlan = subscriptionService.getEffectivePlan(userId);
                return planLimitConfig.getLimit(effectivePlan, limit);
        }

        @Override
        @Transactional(readOnly = true)
        public int getUsed(UUID userId, SubscriptionLimit limit) {

                String usageMonth = YearMonth.now().toString();

                return usageRepository
                                .findByUserIdAndLimitTypeAndUsageMonth(userId, limit, usageMonth)
                                .map(SubscriptionUsage::getUsageCount)
                                .orElse(0);
        }

        // ===================== PRIVATE METHODS ======================

        private SubscriptionUsage createUsage(UUID userId, SubscriptionLimit limit, String usageMonth) {

                return SubscriptionUsage.builder()
                                .userId(userId)
                                .limitType(limit)
                                .usageMonth(usageMonth)
                                .usageCount(0)
                                .build();
        }

        private String formatLimitName(
                        SubscriptionLimit limit) {

                return switch (limit) {

                        case VOICE_INTERVIEWS ->
                                "voice interview";

                        case RESUME_ANALYSES ->
                                "resume analysis";

                        case JOB_SEARCHES ->
                                "job search";
                };
        }
}