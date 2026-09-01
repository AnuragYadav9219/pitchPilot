package com.virtualmentor.subscription.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionProvider subscriptionProvider;

    @Override
    @Transactional
    public Subscription getOrCreate(UUID userId) {

        return subscriptionRepository
                .findByUserId(userId)
                .orElseGet(
                        () -> createFreeSubscription(userId));
    }

    @Override
    @Transactional
    public Subscription createFreeSubscription(UUID userId) {

        Subscription subscription = Subscription
                .builder()
                .userId(userId)
                .plan(SubscriptionPlan.FREE)
                .status(SubscriptionStatus.INACTIVE)
                .build();

        return subscriptionRepository.save(subscription);
    }

    @Override
    @Transactional
    public Subscription sync(UUID userId) {

        Subscription subscription = getOrCreate(userId);

        if (subscription.getProviderCustomerId() == null) {
            return subscription;
        }

        SubscriptionProvider.SubscriptionInfo remote = subscriptionProvider
                .getSubscription(subscription.getProviderCustomerId());

        subscription.setPlan(remote.plan());

        subscription.setStatus(
                remote.status());

        subscription.setProviderSubscriptionId(
                remote.subscriptionId());

        subscription.setProductId(
                remote.productId());

        subscription.setStartedAt(
                remote.startedAt());

        subscription.setExpiresAt(
                remote.expiresAt());

        subscription.setAutoRenew(
                remote.autoRenew());

        subscription.setEnvironment(
                remote.environment());

        return subscriptionRepository.save(subscription);
    }
}
