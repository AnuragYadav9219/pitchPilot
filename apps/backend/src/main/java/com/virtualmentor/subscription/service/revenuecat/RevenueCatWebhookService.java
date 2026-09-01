package com.virtualmentor.subscription.service.revenuecat;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.subscription.dto.revenuecat.RevenueCatWebhookEvent;
import com.virtualmentor.subscription.entity.ProcessedWebhook;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.entity.SubscriptionStatus;
import com.virtualmentor.subscription.repository.ProcessedWebhookRepository;
import com.virtualmentor.subscription.repository.SubscriptionRepository;
import com.virtualmentor.subscription.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RevenueCatWebhookService {

    private final SubscriptionRepository subscriptionRepository;
    private final ProcessedWebhookRepository processedWebhookRepository;
    private final SubscriptionService subscriptionService;

    @Transactional
    public void process(RevenueCatWebhookEvent event) {

        validate(event);

        if (processedWebhookRepository.existsByEventId(event.id())) {
            return;
        }

        UUID userId = parseUserId(event.appUserId());

        Subscription subscription = subscriptionRepository
                .findByUserId(userId)
                .orElseGet(
                        () -> createFreeSubscription(userId));

        if (subscription.getProviderCustomerId() == null) {

            subscription.setProviderCustomerId(event.appUserId());

            subscriptionRepository.save(subscription);
        }

        subscriptionService.sync(userId);

        processedWebhookRepository.save(
                ProcessedWebhook.builder()
                        .eventId(event.id())
                        .build());
    }

    private void validate(RevenueCatWebhookEvent event) {

        if (event == null) {
            throw new IllegalArgumentException("Webhook event cannot be null");
        }

        if (event.id() == null || event.id().isBlank()) {
            throw new IllegalArgumentException("Webhook event ID is required");
        }

        if (event.appUserId() == null || event.appUserId().isBlank()) {
            throw new IllegalArgumentException("RevenueCat app user ID is required");
        }
    }

    private UUID parseUserId(String appUserId) {

        try {

            return UUID.fromString(appUserId);

        } catch (IllegalArgumentException ex) {

            throw new IllegalArgumentException("Invalid RevenueCat app user ID");
        }
    }

    private Subscription createFreeSubscription(UUID userId) {

        return Subscription.builder()
                .userId(userId)
                .plan(SubscriptionPlan.FREE)
                .status(SubscriptionStatus.INACTIVE)
                .build();
    }
}
