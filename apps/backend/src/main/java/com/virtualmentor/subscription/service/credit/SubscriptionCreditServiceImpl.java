package com.virtualmentor.subscription.service.credit;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.config.configurations.SubscriptionCreditConfig;
import com.virtualmentor.credit.entity.CreditTransactionType;
import com.virtualmentor.credit.service.CreditService;
import com.virtualmentor.subscription.entity.Subscription;
import com.virtualmentor.subscription.repository.SubscriptionRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionCreditServiceImpl implements SubscriptionCreditService {

        private final SubscriptionRepository subscriptionRepository;
        private final CreditService creditService;
        private final SubscriptionCreditConfig subscriptionCreditConfig;

        @Override
        @Transactional
        public void grantMonthlyCredits(
                        UUID userId,
                        UUID subscriptionId,
                        String billingReference) {

                Subscription subscription = subscriptionRepository
                                .findById(subscriptionId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Subscription not found: "
                                                                + subscriptionId));

                long credits = subscriptionCreditConfig.getMonthlyCredits(subscription.getPlan());

                if (credits <= 0) {
                        return;
                }

                String idempotencyKey = "SUBSCRIPTION_CREDITS:"
                                + subscriptionId
                                + ":"
                                + billingReference;

                creditService.grant(
                                userId,
                                credits,
                                CreditTransactionType.SUBSCRIPTION_GRANT,
                                "MONTHLY_SUBSCRIPTION_CREDITS",
                                subscriptionId,
                                idempotencyKey,
                                "Monthly "
                                                + credits
                                                + " credits for "
                                                + subscription.getPlan()
                                                + " subscription");
        }
}