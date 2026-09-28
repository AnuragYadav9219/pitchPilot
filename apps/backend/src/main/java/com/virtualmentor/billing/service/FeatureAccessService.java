package com.virtualmentor.billing.service;

import java.util.UUID;

import com.virtualmentor.billing.entity.Feature;

public interface FeatureAccessService {

    void authorize(
            UUID userId,
            Feature feature,
            UUID referenceId);

    void complete(
            UUID userId,
            Feature feature,
            UUID referenceId);

    void cancel(
            UUID userId,
            Feature feature,
            UUID referenceId);
}