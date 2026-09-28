package com.virtualmentor.dashboard.service;

import java.util.UUID;

import com.virtualmentor.dashboard.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(UUID userId);
}