package com.virtualmentor.subscription.service;

import java.time.YearMonth;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.config.PlanLimitConfig;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionUsage;
import com.virtualmentor.subscription.exception.SubscriptionLimitExceededException;
import com.virtualmentor.subscription.repository.SubscriptionUsageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionLimitServiceImpl implements SubscriptionLimitService {

    private static final int UNLIMITED = -1;

    private final SubscriptionService subscriptionService;
    private final SubscriptionUsageRepository usageRepository;
    private final PlanLimitConfig planLimitConfig;

    @Override
    @Transactional(readOnly = true)
    public boolean canUse(UUID userId, SubscriptionLimit limit) {

        Subscription subscription = subscriptionService.getOrCreate(userId);

        int max = planLimitConfig.getLimit(
                subscription.getPlan(),
                limit);

        if (max == UNLIMITED) {
            return true;
        }

        return getUsed(userId, limit) < max;
    }

    @Override
    @Transactional
    public void consume(UUID userId, SubscriptionLimit limit) {

        Subscription subscription = subscriptionService.getOrCreate(userId);

        int max = planLimitConfig.getLimit(
                subscription.getPlan(),
                limit);

        if (max == UNLIMITED) {
            return;
        }

        String month = YearMonth.now().toString();

        SubscriptionUsage usage = usageRepository
                .findByUserIdAndLimitTypeAndUsageMonth(
                        userId,
                        limit,
                        month)
                .orElseGet(() -> SubscriptionUsage.builder()
                        .userId(userId)
                        .limitType(limit)
                        .usageMonth(month)
                        .usageCount(0)
                        .build());

        if (usage.getUsageCount() >= max) {
            throw new SubscriptionLimitExceededException(
                    "Monthly "
                            + limit.name().toLowerCase()
                            + " limit reached");
        }

        usage.setUsageCount(
                usage.getUsageCount() + 1);

        usageRepository.save(usage);
    }

    @Override
    @Transactional(readOnly = true)
    public int getLimit(UUID userId, SubscriptionLimit limit) {

        Subscription subscription = subscriptionService.getOrCreate(userId);

        return planLimitConfig.getLimit(
                subscription.getPlan(),
                limit);
    }

    @Override
    @Transactional(readOnly = true)
    public int getUsed(UUID userId, SubscriptionLimit limit) {

        String month = YearMonth.now().toString();

        return usageRepository
                .findByUserIdAndLimitTypeAndUsageMonth(
                        userId,
                        limit,
                        month)
                .map(SubscriptionUsage::getUsageCount)
                .orElse(0);
    }
}