package com.virtualmentor.progress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.progress.dto.ProgressResponse;
import com.virtualmentor.progress.service.ProgressService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard/progress")
@RequiredArgsConstructor
public class ProgressController {

        private final ProgressService progressService;
        private final ResponseBuilder responseBuilder;

        @GetMapping
        public ResponseEntity<ApiResponse<ProgressResponse>> getProgress() {

                return responseBuilder.ok(
                                "Progress data fetched successfully",
                                progressService.getProgress());
        }
}