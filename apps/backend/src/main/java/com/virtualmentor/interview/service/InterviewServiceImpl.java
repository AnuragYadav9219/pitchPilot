package com.virtualmentor.interview.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.billing.entity.Feature;
import com.virtualmentor.billing.service.FeatureAccessService;
import com.virtualmentor.common.exception.ResourceNotFoundException;
import com.virtualmentor.interview.dto.StartInterviewRequest;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;
import com.virtualmentor.interview.repository.InterviewRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewRepository interviewRepository;
    private final FeatureAccessService featureAccessService;

    @Override
    @Transactional
    public Interview createInterview(UUID userId, StartInterviewRequest request) {

        Interview interview = Interview.builder()
                .userId(userId)
                .role(request.role())
                .type(request.type())
                .difficulty(request.difficulty())
                .topics(request.topics())
                .durationMinutes(request.durationMinutes())
                .status(InterviewStatus.CREATED)
                .build();

        interview = interviewRepository.save(interview);

        featureAccessService.authorize(
                userId,
                Feature.VOICE_INTERVIEW,
                interview.getBillingReferenceId());

        interview.setStatus(InterviewStatus.CREDIT_RESERVED);

        return interviewRepository.save(interview);
    }

    @Override
    @Transactional
    public Interview completeInterview(Long interviewId, UUID userId) {

        Interview interview = interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        InterviewStatus status = interview.getStatus();

        if (status == InterviewStatus.COMPLETED) {
            return interview;
        }

        if (status != InterviewStatus.IN_PROGRESS) {
            throw new IllegalStateException("Interview cannot be completed from status: " + status);
        }

        try {

            featureAccessService.complete(userId, Feature.VOICE_INTERVIEW, interview.getBillingReferenceId());

            interview.setStatus(InterviewStatus.COMPLETED);
            interview.setCompletedAt(LocalDateTime.now());

            return interviewRepository.save(interview);

        } catch (RuntimeException e) {

            interview.setStatus(InterviewStatus.FAILED);

            interviewRepository.save(interview);

            throw e;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<Interview> getUserInterviews(UUID userId) {
        return interviewRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public Interview getInterview(Long interviewId, UUID userId) {

        return interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
    }
}
