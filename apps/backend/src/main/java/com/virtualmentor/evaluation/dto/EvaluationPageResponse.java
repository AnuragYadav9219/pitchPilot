package com.virtualmentor.evaluation.dto;

import java.util.List;

public record EvaluationPageResponse(
                List<EvaluationSummaryResponse> content,
                int page,
                int size,
                long totalElements,
                int totalPages,
                boolean first,
                boolean last) {
}