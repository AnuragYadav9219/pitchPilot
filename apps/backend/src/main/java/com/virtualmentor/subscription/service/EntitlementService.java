package com.virtualmentor.subscription.service;

import java.util.Set;
import java.util.UUID;

import com.virtualmentor.subscription.entity.Entitlement;

public interface EntitlementService {

    boolean hasEntitlement(UUID userId, Entitlement entitlement);

    void require(UUID userId, Entitlement entitlement);

    Set<Entitlement> getEntitlements(UUID userId);
}
