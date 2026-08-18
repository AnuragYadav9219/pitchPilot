package com.virtualmento.conversation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.conversation.dto.DashboardResponse;
import com.virtualmento.conversation.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final ResponseBuilder responseBuilder;

    @GetMapping
    public ResponseEntity<com.virtualmento.common.response.ApiResponse<DashboardResponse>> getDashboard() {

        DashboardResponse dashboard = dashboardService.getDashboard();

        return responseBuilder.ok(
                "Dashboard data fetched successfully",
                dashboard);
    }
}