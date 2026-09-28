package com.virtualmentor.evaluation.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.evaluation.dto.EvaluationResponse;
import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.entity.EvaluationQuestionResult;
import com.virtualmentor.evaluation.repository.EvaluationQuestionResultRepository;
import com.virtualmentor.evaluation.service.EvaluationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class EvaluationController {

    private final EvaluationService evaluationService;
    private final EvaluationQuestionResultRepository questionResultRepository;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    @PostMapping("/{interviewId}/evaluation")
    public ResponseEntity<ApiResponse<EvaluationResponse>> generateEvaluation(@PathVariable Long interviewId) {

        UUID userId = currentUserProvider.getUserId();

        InterviewEvaluation evaluation = evaluationService.evaluate(interviewId, userId);

        List<EvaluationQuestionResult> questions = questionResultRepository
                .findByEvaluationIdOrderByQuestionNumberAsc(evaluation.getId());

        EvaluationResponse response = EvaluationResponse.from(evaluation, questions);

        return responseBuilder.ok(
                "Evaluation generated successfully",
                response);
    }

    @GetMapping("/{interviewId}/evaluation")
    public ResponseEntity<ApiResponse<EvaluationResponse>> getEvaluation(@PathVariable Long interviewId) {

        UUID userId = currentUserProvider.getUserId();

        InterviewEvaluation evaluation = evaluationService.getEvaluation(interviewId, userId);

        List<EvaluationQuestionResult> questions = questionResultRepository
                .findByEvaluationIdOrderByQuestionNumberAsc(evaluation.getId());

        EvaluationResponse response = EvaluationResponse.from(evaluation, questions);

        return responseBuilder.ok(
                "Evaluation fetched successfully",
                response);
    }
}