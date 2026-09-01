package com.virtualmentor.recommendation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.recommendation.dto.RecommendationResponse;
import com.virtualmentor.recommendation.service.RecommendationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;
    private final ResponseBuilder responseBuilder;

    @GetMapping
    public ResponseEntity<ApiResponse<RecommendationResponse>> getRecommendation() {

        return responseBuilder.ok(
                "Practice recommendation fetched successfully",
                recommendationService.getRecommendation());
    }
}