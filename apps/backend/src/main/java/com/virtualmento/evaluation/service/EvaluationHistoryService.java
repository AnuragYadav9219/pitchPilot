package com.virtualmento.evaluation.service;

import com.virtualmento.evaluation.dto.EvaluationPageResponse;

public interface EvaluationHistoryService {

    EvaluationPageResponse getMyEvaluations(
            int page,
            int size
    );
}