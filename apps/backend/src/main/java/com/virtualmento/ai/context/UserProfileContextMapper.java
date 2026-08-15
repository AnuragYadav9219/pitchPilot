package com.virtualmento.ai.context;

import java.util.HashSet;

import org.springframework.stereotype.Component;

import com.virtualmento.user.entity.UserProfile;

@Component
public class UserProfileContextMapper {

    public UserProfileContext toContext(UserProfile profile) {

        if (profile == null) {
            return empty();
        }

        return new UserProfileContext(

                profile.getEducation(),

                profile.getExperienceLevel() != null
                        ? profile.getExperienceLevel().name()
                        : null,

                profile.getSkills() != null
                        ? new HashSet<>(profile.getSkills())
                        : new HashSet<>(),

                profile.getInterests() != null
                        ? new HashSet<>(profile.getInterests())
                        : new HashSet<>(),

                profile.getCareerGoal(),

                profile.getLearningStyle() != null
                        ? profile.getLearningStyle().name()
                        : null);
    }

    public UserProfileContext empty() {

        return new UserProfileContext(
                null,
                null,
                new HashSet<>(),
                new HashSet<>(),
                null,
                null);
    }

}
