package com.virtualmentor.user.dto;

import java.util.Set;
import java.util.UUID;

import com.virtualmentor.user.entity.ExperienceLevel;
import com.virtualmentor.user.entity.LearningStyle;

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