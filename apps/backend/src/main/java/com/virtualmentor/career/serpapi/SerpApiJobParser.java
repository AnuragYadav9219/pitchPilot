package com.virtualmentor.career.serpapi;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.virtualmentor.career.dto.JobApplyOption;
import com.virtualmentor.career.dto.JobHighlight;
import com.virtualmentor.career.dto.JobResult;

@Component
public class SerpApiJobParser {

    public List<JobResult> parse(JsonNode response) {

        List<JobResult> jobs = new ArrayList<>();

        JsonNode jobsResults = response.path("jobs_results");

        if (!jobsResults.isArray()) {
            return jobs;
        }

        for (JsonNode job : jobsResults) {

            jobs.add(
                    new JobResult(
                            text(job, "job_id"),
                            text(job, "title"),
                            text(job, "company_name"),
                            text(job, "location"),
                            text(job, "description"),
                            text(job, "via"),
                            text(job, "share_link"),
                            extractHighlights(job),
                            extractSkills(job),
                            extractApplyOptions(job)));
        }

        return jobs;
    }

    // ============================================================
    // TEXT
    // ============================================================

    private String text(
            JsonNode node,
            String field) {

        JsonNode value = node.get(field);

        if (value == null || value.isNull()) {
            return null;
        }

        return value.asText();
    }

    // ============================================================
    // SKILLS
    // ============================================================

    private List<String> extractSkills(
            JsonNode job) {

        List<String> skills = new ArrayList<>();

        /*
         * SerpApi may provide skills in detected_extensions.
         */

        JsonNode detectedExtensions = job.get("detected_extensions");

        if (detectedExtensions != null
                && detectedExtensions.isObject()) {

            JsonNode skillsNode = detectedExtensions.get("skills");

            if (skillsNode != null
                    && skillsNode.isArray()) {

                for (JsonNode skill : skillsNode) {

                    if (skill != null
                            && !skill.isNull()
                            && !skill.asText().isBlank()) {
                        skills.add(
                                skill.asText());
                    }
                }
            }
        }

        /*
         * Some responses may expose skills directly.
         */

        if (skills.isEmpty()) {

            JsonNode skillsNode = job.get("skills");

            if (skillsNode != null
                    && skillsNode.isArray()) {

                for (JsonNode skill : skillsNode) {

                    if (skill != null
                            && !skill.isNull()
                            && !skill.asText().isBlank()) {
                        skills.add(
                                skill.asText());
                    }
                }
            }
        }

        return skills;
    }

    // ============================================================
    // JOB HIGHLIGHTS
    // ============================================================

    private List<JobHighlight> extractHighlights(
            JsonNode job) {

        List<JobHighlight> highlights = new ArrayList<>();

        JsonNode node = job.get("job_highlights");

        if (node == null
                || !node.isArray()) {
            return highlights;
        }

        for (JsonNode section : node) {

            String title = text(section, "title");

            List<String> items = new ArrayList<>();

            JsonNode itemsNode = section.get("items");

            if (itemsNode != null
                    && itemsNode.isArray()) {

                for (JsonNode item : itemsNode) {

                    if (item != null
                            && !item.isNull()
                            && !item.asText().isBlank()) {

                        items.add(
                                item.asText());
                    }
                }
            }

            if ((title != null && !title.isBlank())
                    || !items.isEmpty()) {

                highlights.add(
                        new JobHighlight(
                                title,
                                items));
            }
        }

        return highlights;
    }

    // ============================================================
    // APPLY OPTIONS
    // ============================================================

    private List<JobApplyOption> extractApplyOptions(
            JsonNode job) {

        List<JobApplyOption> options = new ArrayList<>();

        JsonNode applyOptions = job.get("apply_options");

        if (applyOptions == null
                || !applyOptions.isArray()) {
            return options;
        }

        for (JsonNode option : applyOptions) {

            String title = text(option, "title");

            String link = text(option, "link");

            if (link != null
                    && !link.isBlank()) {

                options.add(
                        new JobApplyOption(
                                title,
                                link));
            }
        }

        return options;
    }
}