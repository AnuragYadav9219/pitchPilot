package com.virtualmentor.credit.service;

import com.virtualmentor.billing.entity.Feature;

public interface FeatureCreditCostService {

    long getCost(Feature feature);
}