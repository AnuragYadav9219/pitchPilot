package com.virtualmentor.career.service;

import com.virtualmentor.career.dto.JobResult;

import java.util.List;
import java.util.Map;

public interface SkillExtractionService {

    Map<String, Integer> extractSkillDemand(List<JobResult> jobs);
}