package com.virtualmentor.subscription.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmentor.subscription.entity.ProcessedWebhook;

public interface ProcessedWebhookRepository extends JpaRepository<ProcessedWebhook, UUID> {

    boolean existsByEventId(String eventId);
}