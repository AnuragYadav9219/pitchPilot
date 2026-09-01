package com.virtualmentor.subscription.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.subscription.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, UUID> {

    Optional<Subscription> findByUserId(UUID userId);

    Optional<Subscription> findByProviderCustomerId(String providerCustomerId);
}
