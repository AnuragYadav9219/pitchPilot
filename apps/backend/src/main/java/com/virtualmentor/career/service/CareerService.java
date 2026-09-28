package com.virtualmentor.career.service;

import java.util.UUID;

import com.virtualmentor.career.dto.JobSearchResponse;

public interface CareerService {

    JobSearchResponse searchJobs(
            UUID userId,
            String query,
            String location);

    JobSearchResponse fetchJobs(
            String query,
            String location);
}