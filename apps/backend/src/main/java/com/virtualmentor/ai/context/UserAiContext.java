package com.virtualmentor.ai.context;

import com.virtualmentor.user.entity.ExperienceLevel;
import com.virtualmentor.user.entity.LearningStyle;

import java.util.Set;
import java.util.UUID;

public record UserAiContext(
        UUID userId,
        String fullName,
        String bio,
        String education,
        ExperienceLevel experienceLevel,
        Set<String> skills,
        Set<String> interests,
        String careerGoal,
        LearningStyle learningStyle) {
}