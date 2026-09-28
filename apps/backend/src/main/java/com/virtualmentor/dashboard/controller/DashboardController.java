package com.virtualmentor.dashboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.dashboard.dto.DashboardResponse;
import com.virtualmentor.dashboard.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final CurrentUserProvider currentUserProvider;

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard(currentUserProvider.getUserId());
    }
}
