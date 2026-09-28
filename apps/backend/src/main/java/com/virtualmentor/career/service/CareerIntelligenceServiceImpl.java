package com.virtualmentor.career.service;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.billing.service.FeatureAccessService;
import com.virtualmentor.career.dto.CareerAnalysisResponse;
import com.virtualmentor.career.dto.CareerIntelligenceResponse;
import com.virtualmentor.career.dto.JobResult;
import com.virtualmentor.career.dto.JobSearchResponse;
import com.virtualmentor.career.dto.SkillDemand;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CareerIntelligenceServiceImpl implements CareerIntelligenceService {

        private final CareerService careerService;
        private final CareerAiService careerAiService;
        private final SkillExtractionService skillExtractionService;
        private final FeatureAccessService featureAccessService;

        @Override
        public CareerIntelligenceResponse analyze(UUID userId, String role, String location) {

                JobSearchResponse searchResponse = careerService.searchJobs(userId, role, location);

                List<JobResult> jobs = searchResponse.jobs();

                Map<String, Integer> skillDemand = skillExtractionService.extractSkillDemand(jobs);

                List<SkillDemand> topSkills = buildTopSkills(skillDemand, jobs.size());

                List<String> topCompanies = extractTopCompanies(jobs);

                List<String> topLocations = extractTopLocations(jobs);

                return new CareerIntelligenceResponse(
                                role,
                                location,
                                jobs.size(),
                                topSkills,
                                topCompanies,
                                topLocations);
        }

        private List<SkillDemand> buildTopSkills(
                        Map<String, Integer> demand,
                        int totalJobs) {

                if (totalJobs == 0) {
                        return List.of();
                }

                return demand.entrySet()
                                .stream()
                                .sorted(Map.Entry
                                                .<String, Integer>comparingByValue()
                                                .reversed())
                                .limit(10)
                                .map(entry -> {

                                        double percentage = (entry.getValue() * 100.0) / totalJobs;

                                        return new SkillDemand(
                                                        entry.getKey(),
                                                        entry.getValue(),
                                                        Math.round(percentage * 10.0) / 10.0);
                                })
                                .toList();
        }

        private List<String> extractTopCompanies(List<JobResult> jobs) {

                return jobs.stream()
                                .map(JobResult::companyName)
                                .filter(Objects::nonNull)
                                .filter(name -> !name.isBlank())
                                .collect(Collectors.groupingBy(name -> name, Collectors.counting()))
                                .entrySet()
                                .stream()
                                .sorted(Map.Entry
                                                .<String, Long>comparingByValue()
                                                .reversed())
                                .limit(10)
                                .map(Map.Entry::getKey)
                                .toList();
        }

        private List<String> extractTopLocations(
                        List<JobResult> jobs) {

                return jobs.stream()
                                .map(JobResult::location)
                                .filter(Objects::nonNull)
                                .filter(location -> !location.isBlank())
                                .collect(Collectors.groupingBy(
                                                location -> location,
                                                Collectors.counting()))
                                .entrySet()
                                .stream()
                                .sorted(Map.Entry
                                                .<String, Long>comparingByValue()
                                                .reversed())
                                .limit(10)
                                .map(Map.Entry::getKey)
                                .toList();
        }

        @Override
        public CareerAnalysisResponse analyzeWithAi(UUID userId, String role, String location) {

                UUID referenceId = UUID.randomUUID();

                featureAccessService.authorize(userId, Feature.JOB_ANALYSIS, referenceId);

                try {

                        CareerIntelligenceResponse intelligence = analyzeWithoutBilling(userId, role, location);

                        if (intelligence.jobsAnalyzed() == 0) {
                                throw new IllegalStateException("No jobs found for the requested search");
                        }

                        var aiAnalysis = careerAiService.analyze(intelligence);

                        featureAccessService.complete(userId, Feature.JOB_ANALYSIS, referenceId);

                        return new CareerAnalysisResponse(
                                        intelligence.role(),
                                        intelligence.location(),
                                        intelligence.jobsAnalyzed(),
                                        intelligence.marketSkills(),
                                        intelligence.topCompanies(),
                                        intelligence.topLocations(),
                                        aiAnalysis);

                } catch (Exception ex) {

                        featureAccessService.cancel(userId, Feature.JOB_ANALYSIS, referenceId);
                        throw ex;
                }
        }

        private CareerIntelligenceResponse analyzeWithoutBilling(UUID userId, String role, String location) {

                JobSearchResponse searchResponse = careerService.fetchJobs(role, location);

                List<JobResult> jobs = searchResponse.jobs();

                Map<String, Integer> skillDemand = skillExtractionService.extractSkillDemand(jobs);

                List<SkillDemand> topSkills = buildTopSkills(skillDemand, jobs.size());

                List<String> topCompanies = extractTopCompanies(jobs);

                List<String> topLocations = extractTopLocations(jobs);

                return new CareerIntelligenceResponse(
                                role,
                                location,
                                jobs.size(),
                                topSkills,
                                topCompanies,
                                topLocations);
        }
}