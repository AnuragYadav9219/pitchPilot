package com.virtualmentor.ai.context;

import java.util.HashSet;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.virtualmentor.common.exception.ResourceNotFoundException;
import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.repository.InterviewRepository;
import com.virtualmentor.user.entity.UserProfile;
import com.virtualmentor.user.repository.UserProfileRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewContextService {

    private final InterviewRepository interviewRepository;
    private final UserProfileRepository profileRepository;

    public InterviewAiContext build(Long interviewId, UUID userId) {

        Interview interview = interviewRepository
                .findByIdAndUserId(interviewId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));

        UserProfile profile = profileRepository
                .findByUserIdWithContext(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found"));

        UserAiContext userContext = new UserAiContext(
                profile.getUser().getId(),
                profile.getUser().getFullName(),
                profile.getBio(),
                profile.getEducation(),
                profile.getExperienceLevel(),
                new HashSet<>(profile.getSkills()),
                new HashSet<>(profile.getInterests()),
                profile.getCareerGoal(),
                profile.getLearningStyle());

        return new InterviewAiContext(
                userContext,
                interview.getRole(),
                interview.getType().name(),
                interview.getDifficulty().name(),
                interview.getTopics(),
                interview.getDurationMinutes());
    }
}
