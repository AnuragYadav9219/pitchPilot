package com.virtualmento.user.dto;

import java.util.Set;
import java.util.UUID;

import com.virtualmento.user.entity.ExperienceLevel;
import com.virtualmento.user.entity.LearningStyle;

public record UserProfileResponse(

        UUID id,

        String bio,

        String education,

        ExperienceLevel experienceLevel,

        Set<String> skills,

        Set<String> interests,

        String careerGoal,

        LearningStyle learningStyle) {
}