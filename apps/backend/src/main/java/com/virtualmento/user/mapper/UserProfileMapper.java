package com.virtualmento.user.mapper;

import java.util.HashSet;

import org.springframework.stereotype.Component;

import com.virtualmento.user.dto.UserProfileResponse;
import com.virtualmento.user.entity.UserProfile;

@Component
public class UserProfileMapper {

    public UserProfileResponse toResponse(
            UserProfile profile) {

        return new UserProfileResponse(

                profile.getId(),

                profile.getBio(),

                profile.getEducation(),

                profile.getExperienceLevel(),

                profile.getSkills() == null
                        ? new HashSet<>()
                        : new HashSet<>(profile.getSkills()),

                profile.getInterests() == null
                        ? new HashSet<>()
                        : new HashSet<>(profile.getInterests()),

                profile.getCareerGoal(),

                profile.getLearningStyle());
    }
}