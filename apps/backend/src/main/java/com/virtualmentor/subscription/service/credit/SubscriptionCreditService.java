package com.virtualmentor.subscription.service.credit;

import java.util.UUID;

public interface SubscriptionCreditService {

    void grantMonthlyCredits(UUID userId, UUID subscriptionId, String billingReference);
}
