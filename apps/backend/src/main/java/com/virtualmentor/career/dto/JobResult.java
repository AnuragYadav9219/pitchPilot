package com.virtualmentor.career.dto;

import java.util.List;

public record JobResult(
        String jobId,
        String title,
        String companyName,
        String location,
        String description,
        String via,
        String shareLink,
        List<JobHighlight> highlights,
        List<String> skills,
        List<JobApplyOption> applyOptions
) {
}