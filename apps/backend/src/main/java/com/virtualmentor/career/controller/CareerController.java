package com.virtualmentor.career.controller;

import com.virtualmentor.career.dto.CareerAnalysisResponse;
import com.virtualmentor.career.dto.CareerIntelligenceResponse;
import com.virtualmentor.career.dto.JobSearchRequest;
import com.virtualmentor.career.dto.JobSearchResponse;
import com.virtualmentor.career.service.CareerIntelligenceService;
import com.virtualmentor.career.service.CareerService;
import com.virtualmentor.common.security.CurrentUserProvider;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/career")
@RequiredArgsConstructor
public class CareerController {

        private final CareerService careerService;
        private final CareerIntelligenceService careerIntelligenceService;
        private final CurrentUserProvider currentUserProvider;

        @PostMapping("/jobs/search")
        public JobSearchResponse searchJobs(
                        @Valid @RequestBody JobSearchRequest request) {

                UUID userId = currentUserProvider.getUserId();

                return careerService.searchJobs(
                                userId,
                                request.query(),
                                request.location());
        }

        @PostMapping("/intelligence")
        public CareerIntelligenceResponse analyzeCareer(
                        @Valid @RequestBody JobSearchRequest request) {

                UUID userId = currentUserProvider.getUserId();

                return careerIntelligenceService.analyze(
                                userId,
                                request.query(),
                                request.location());
        }

        @PostMapping("/analyze")
        public CareerAnalysisResponse analyzeCareerWithAi(
                        @Valid @RequestBody JobSearchRequest request) {

                UUID userId = currentUserProvider.getUserId();

                return careerIntelligenceService.analyzeWithAi(
                                userId,
                                request.query(),
                                request.location());
        }
}