package com.virtualmentor.evaluation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.evaluation.dto.EvaluationPageResponse;
import com.virtualmentor.evaluation.service.EvaluationHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/evaluations")
@RequiredArgsConstructor
public class EvaluationHistoryController {

    private final EvaluationHistoryService evaluationHistoryService;
    private final ResponseBuilder responseBuilder;

    @GetMapping
    public ResponseEntity<ApiResponse<EvaluationPageResponse>> getMyEvaluations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return responseBuilder.ok(
                "Evaluations fetched successfully",
                evaluationHistoryService.getMyEvaluations(
                        page,
                        size));
    }
}