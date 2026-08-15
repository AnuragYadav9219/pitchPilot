package com.virtualmento.ai.context;

import java.util.Set;

public record UserProfileContext(

        String education,

        String experienceLevel,

        Set<String> skills,

        Set<String> interests,

        String careerGoal,

        String learningStyle
) {
}