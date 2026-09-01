package com.virtualmentor.ai.context;

import java.util.Set;

public record UserProfileContext(
                String fullName,
                String education,
                String experienceLevel,
                Set<String> skills,
                Set<String> interests,
                String careerGoal,
                String learningStyle) {
}