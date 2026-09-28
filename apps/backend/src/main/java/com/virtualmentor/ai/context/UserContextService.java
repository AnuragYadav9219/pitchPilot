package com.virtualmentor.ai.context;

import com.virtualmentor.user.entity.UserProfile;
import com.virtualmentor.user.service.UserProfileService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserContextService {

    private final UserProfileService profileService;

    @Transactional(readOnly = true)
    public UserAiContext getUserContext(UUID userId) {

        UserProfile profile = profileService.getOrCreateProfile(userId);

        return new UserAiContext(
                profile.getUser().getId(),
                profile.getUser().getFullName(),
                profile.getBio(),
                profile.getEducation(),
                profile.getExperienceLevel(),
                new HashSet<>(profile.getSkills()),
                new HashSet<>(profile.getInterests()),
                profile.getCareerGoal(),
                profile.getLearningStyle());
    }
}