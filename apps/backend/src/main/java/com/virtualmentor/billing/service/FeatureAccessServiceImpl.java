package com.virtualmentor.billing.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.billing.exception.FeatureNotAvailableException;
import com.virtualmentor.credit.service.CreditService;
import com.virtualmentor.credit.service.FeatureCreditCostService;
import com.virtualmentor.subscription.entity.Entitlement;
import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.entity.SubscriptionPlan;
import com.virtualmentor.subscription.exception.SubscriptionLimitExceededException;
import com.virtualmentor.subscription.service.EntitlementService;
import com.virtualmentor.subscription.service.SubscriptionLimitService;
import com.virtualmentor.subscription.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeatureAccessServiceImpl implements FeatureAccessService {

    private final EntitlementService entitlementService;
    private final SubscriptionLimitService subscriptionLimitService;
    private final SubscriptionService subscriptionService;

    private final CreditService creditService;
    private final FeatureBillingConfig featureBillingConfig;
    private final FeatureCreditCostService featureCreditCostService;

    // =============================================================
    // AUTHORIZE
    // =============================================================

    @Override
    @Transactional
    public void authorize(
            UUID userId,
            Feature feature,
            UUID referenceId) {

        validate(userId, feature, referenceId);

        SubscriptionPlan effectivePlan = subscriptionService.getEffectivePlan(userId);

        if (feature == Feature.VOICE_INTERVIEW) {

            if (effectivePlan == SubscriptionPlan.FREE) {

                SubscriptionLimit limit = featureBillingConfig.getLimit(feature);

                if (subscriptionLimitService.canUse(userId, limit)) {
                    subscriptionLimitService.consume(userId, limit);
                    return;
                }
            }

            if (featureBillingConfig.usesCredits(feature)) {

                long cost = featureCreditCostService.getCost(feature);

                if (cost <= 0) {
                    throw new IllegalStateException("Credit-based feature has invalid credit cost: " + feature);
                }

                creditService.reserve(
                        userId,
                        cost,
                        feature.name(),
                        referenceId,
                        reservationKey(feature, referenceId),
                        "Reserved "
                                + cost
                                + " credits for "
                                + feature.name());

                return;
            }

            throw new IllegalStateException("Voice interview is not properly configured for " + effectivePlan);
        }

        if (featureBillingConfig.requiresEntitlement(feature)) {

            checkEntitlement(userId, feature);
        }

        if (featureBillingConfig.hasLimit(feature)) {

            SubscriptionLimit limit = featureBillingConfig.getLimit(feature);

            if (!subscriptionLimitService.canUse(userId, limit)) {

                throw new SubscriptionLimitExceededException(
                        "Monthly "
                                + formatLimitName(limit)
                                + " limit reached");
            }
        }

        if (featureBillingConfig.usesCredits(feature)) {

            long cost = featureCreditCostService.getCost(feature);

            if (cost <= 0) {
                throw new IllegalStateException("Credit-based feature has invalid credit cost: " + feature);
            }

            creditService.reserve(
                    userId,
                    cost,
                    feature.name(),
                    referenceId,
                    reservationKey(feature, referenceId),
                    "Reserved "
                            + cost
                            + " credits for "
                            + feature.name());
        }

        if (featureBillingConfig.hasLimit(feature)) {
            SubscriptionLimit limit = featureBillingConfig.getLimit(feature);
            subscriptionLimitService.consume(userId, limit);
        }
    }

    // =============================================================
    // COMPLETE
    // =============================================================

    @Override
    @Transactional
    public void complete(
            UUID userId,
            Feature feature,
            UUID referenceId) {

        validate(userId, feature, referenceId);

        if (!featureBillingConfig.usesCredits(feature)) {
            return;
        }

        if (!creditService.hasReservation(userId, referenceId)) {
            return;
        }

        long cost = featureCreditCostService.getCost(feature);

        if (cost <= 0) {
            throw new IllegalStateException("Credit-based feature has invalid credit cost: " + feature);
        }

        creditService.consumeReservation(
                userId,
                cost,
                feature.name(),
                referenceId,
                completionKey(feature, referenceId),
                "Consumed "
                        + cost
                        + " credits for "
                        + feature.name());
    }

    // =============================================================
    // CANCEL
    // =============================================================

    @Override
    @Transactional
    public void cancel(
            UUID userId,
            Feature feature,
            UUID referenceId) {

        validate(userId, feature, referenceId);

        if (!featureBillingConfig.usesCredits(feature)) {
            return;
        }

        if (!creditService.hasReservation(userId, referenceId)) {
            return;
        }

        long cost = featureCreditCostService.getCost(feature);

        if (cost <= 0) {
            throw new IllegalStateException("Credit-based feature has invalid credit cost: " + feature);
        }

        creditService.releaseReservation(
                userId,
                cost,
                feature.name(),
                referenceId,
                releaseKey(feature, referenceId),
                "Released "
                        + cost
                        + " reserved credits for "
                        + feature.name());
    }

    // =============================================================
    // ENTITLEMENT
    // =============================================================

    private void checkEntitlement(UUID userId, Feature feature) {

        if (!featureBillingConfig.requiresEntitlement(feature)) {
            return;
        }

        Entitlement entitlement = featureBillingConfig.getEntitlement(feature);

        if (!entitlementService.hasEntitlement(userId, entitlement)) {

            throw new FeatureNotAvailableException(
                    "Feature "
                            + feature
                            + " is not available "
                            + "in the current subscription");
        }
    }

    // =============================================================
    // IDEMPOTENCY KEYS
    // =============================================================

    private String reservationKey(Feature feature, UUID referenceId) {

        return "RESERVATION:"
                + feature.name()
                + ":"
                + referenceId;
    }

    private String completionKey(Feature feature, UUID referenceId) {

        return "CONSUME:"
                + feature.name()
                + ":"
                + referenceId;
    }

    private String releaseKey(Feature feature, UUID referenceId) {

        return "RELEASE:"
                + feature.name()
                + ":"
                + referenceId;
    }

    // =============================================================
    // LIMIT NAME
    // =============================================================

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

    // =============================================================
    // VALIDATION
    // =============================================================

    private void validate(
            UUID userId,
            Feature feature,
            UUID referenceId) {

        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }

        if (feature == null) {
            throw new IllegalArgumentException("Feature cannot be null");
        }

        if (referenceId == null) {
            throw new IllegalArgumentException("Reference ID cannot be null");
        }
    }
}