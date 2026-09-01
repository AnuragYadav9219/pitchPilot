package com.virtualmentor.evaluation.service;

import com.virtualmentor.evaluation.dto.EvaluationPageResponse;

public interface EvaluationHistoryService {

    EvaluationPageResponse getMyEvaluations(
            int page,
            int size);
}