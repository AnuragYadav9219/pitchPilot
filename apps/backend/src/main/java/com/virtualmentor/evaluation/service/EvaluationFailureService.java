package com.virtualmentor.evaluation.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.virtualmentor.evaluation.entity.InterviewEvaluation;
import com.virtualmentor.evaluation.enums.EvaluationStatus;
import com.virtualmentor.evaluation.repository.InterviewEvaluationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EvaluationFailureService {

    private final InterviewEvaluationRepository evaluationRepository;

    public void markFailed(Long interviewId, UUID userId) {

        evaluationRepository
                .findByInterviewIdAndUserId(interviewId, userId)
                .ifPresentOrElse(
                        evaluation -> {
                            evaluation.setStatus(
                                    EvaluationStatus.FAILED);

                            evaluationRepository.save(evaluation);
                        },
                        () -> {
                            InterviewEvaluation evaluation = InterviewEvaluation.builder()
                                    .interviewId(interviewId)
                                    .userId(userId)
                                    .status(EvaluationStatus.FAILED)
                                    .build();

                            evaluationRepository.save(evaluation);
                        });
    }
}
