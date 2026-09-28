package com.virtualmentor.career.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.virtualmentor.career.dto.JobResult;
import com.virtualmentor.career.dto.JobSearchResponse;
import com.virtualmentor.career.serpapi.SerpApiClient;
import com.virtualmentor.career.serpapi.SerpApiJobParser;
import com.virtualmentor.subscription.entity.SubscriptionLimit;
import com.virtualmentor.subscription.service.SubscriptionLimitService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CareerServiceImpl implements CareerService {

        private final SerpApiClient serpApiClient;
        private final SerpApiJobParser serpApiJobParser;
        private final SubscriptionLimitService subscriptionLimitService;

        @Override
        public JobSearchResponse searchJobs(
                        UUID userId,
                        String query,
                        String location) {

                JobSearchResponse response = fetchJobs(query, location);

                if (response.jobs().isEmpty()) {
                        throw new IllegalStateException("No jobs found for the requested search");
                }

                subscriptionLimitService.consume(userId, SubscriptionLimit.JOB_SEARCHES);

                return response;

        }

        @Override
        public JobSearchResponse fetchJobs(String query, String location) {

                JsonNode response = serpApiClient.searchJobs(query, location);

                List<JobResult> jobs = serpApiJobParser.parse(response);

                return new JobSearchResponse(
                                query,
                                location,
                                jobs.size(),
                                jobs);
        }
}