package com.virtualmento.progress.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmento.common.response.ApiResponse;
import com.virtualmento.common.response.ResponseBuilder;
import com.virtualmento.progress.dto.ProgressResponse;
import com.virtualmento.progress.service.ProgressService;

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