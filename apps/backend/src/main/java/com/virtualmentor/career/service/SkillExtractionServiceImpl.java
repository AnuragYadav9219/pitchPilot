package com.virtualmentor.career.service;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.virtualmentor.career.dto.JobResult;

@Service
public class SkillExtractionServiceImpl implements SkillExtractionService {

    private static final List<String> COMMON_SKILLS = List.of(
            "Java",
            "Spring Boot",
            "Spring",
            "Spring Security",
            "Hibernate",
            "JPA",
            "REST API",
            "REST",
            "Microservices",
            "SQL",
            "MySQL",
            "PostgreSQL",
            "MongoDB",
            "Redis",
            "Kafka",
            "Docker",
            "Kubernetes",
            "AWS",
            "Azure",
            "GCP",
            "Git",
            "GitHub",
            "Jenkins",
            "CI/CD",
            "Python",
            "JavaScript",
            "TypeScript",
            "React",
            "Angular",
            "Node.js",
            "Linux");

    @Override
    public Map<String, Integer> extractSkillDemand(List<JobResult> jobs) {

        Map<String, Integer> demand = new HashMap<>();

        for (JobResult job : jobs) {

            String text = buildSearchText(job);

            for (String skill : COMMON_SKILLS) {
                if (containsSkill(text, skill)) {
                    demand.merge(skill, 1, Integer::sum);
                }
            }
        }

        return demand;
    }

    private String buildSearchText(
            JobResult job) {

        String highlights = job.highlights() == null
                ? ""
                : job.highlights()
                        .stream()
                        .flatMap(
                                highlight -> highlight.items()
                                        .stream())
                        .reduce(
                                "",
                                (a, b) -> a + " " + b);

        String skills = job.skills() == null
                ? ""
                : String.join(
                        " ",
                        job.skills());

        return String.join(
                " ",
                safe(job.title()),
                safe(job.companyName()),
                safe(job.location()),
                safe(job.description()),
                safe(job.via()),
                highlights,
                skills).toLowerCase(Locale.ROOT);
    }

    private boolean containsSkill(String text, String skill) {
        String normalizedSill = skill.toLowerCase(Locale.ROOT);
        return text.contains(normalizedSill);
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
