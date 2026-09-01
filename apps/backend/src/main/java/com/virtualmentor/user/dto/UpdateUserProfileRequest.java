package com.virtualmentor.user.dto;

import java.util.Set;

import com.virtualmentor.user.entity.ExperienceLevel;
import com.virtualmentor.user.entity.LearningStyle;

import jakarta.validation.constraints.Size;

public record UpdateUserProfileRequest(

                @Size(max = 2000) String bio,

                @Size(max = 500) String education,

                ExperienceLevel experienceLevel,

                Set<@Size(max = 100) String> skills,

                Set<@Size(max = 100) String> interests,

                @Size(max = 1000) String careerGoal,

                LearningStyle learningStyle) {
}