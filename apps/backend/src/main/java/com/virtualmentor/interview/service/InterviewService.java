package com.virtualmentor.interview.service;

import java.util.List;
import java.util.UUID;

import com.virtualmentor.interview.dto.StartInterviewRequest;
import com.virtualmentor.interview.entity.Interview;

public interface InterviewService {

    Interview createInterview(UUID userId, StartInterviewRequest request);

    Interview completeInterview(Long interviewId, UUID userId);

    List<Interview> getUserInterviews(UUID userId);

    Interview getInterview(
            Long interviewId,
            UUID userId);
}
