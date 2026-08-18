package com.virtualmento.recommendation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.recommendation.dto.RecommendationResponse;
import com.virtualmento.recommendation.service.RecommendationService;

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