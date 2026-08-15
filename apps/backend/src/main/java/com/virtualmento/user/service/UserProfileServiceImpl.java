package com.virtualmento.user.service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.exception.ResourceNotFoundException;
import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.user.dto.UpdateUserProfileRequest;
import com.virtualmento.user.dto.UserProfileResponse;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.entity.UserProfile;
import com.virtualmento.user.mapper.UserProfileMapper;
import com.virtualmento.user.repository.UserProfileRepository;
import com.virtualmento.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl
        implements UserProfileService {

    private final UserProfileRepository profileRepository;

    private final UserRepository userRepository;

    private final CurrentUserProvider currentUserProvider;

    private final UserProfileMapper profileMapper;

    // =========================================================
    // GET MY PROFILE
    // =========================================================

    @Override
    @Transactional
    public UserProfileResponse getMyProfile() {

        UUID userId =
                currentUserProvider.getUserId();

        UserProfile profile =
                profileRepository
                        .findByUserId(userId)
                        .orElseGet(() ->
                                createDefaultProfile(userId));

        return profileMapper.toResponse(profile);
    }

    // =========================================================
    // UPDATE MY PROFILE
    // =========================================================

    @Override
    @Transactional
    public UserProfileResponse updateMyProfile(
            UpdateUserProfileRequest request) {

        UUID userId =
                currentUserProvider.getUserId();

        UserProfile profile =
                profileRepository
                        .findByUserId(userId)
                        .orElseGet(() ->
                                createDefaultProfile(userId));

        // -----------------------------------------------------
        // Basic information
        // -----------------------------------------------------

        profile.setBio(
                normalize(request.bio())
        );

        profile.setEducation(
                normalize(request.education())
        );

        profile.setExperienceLevel(
                request.experienceLevel()
        );

        profile.setCareerGoal(
                normalize(request.careerGoal())
        );

        profile.setLearningStyle(
                request.learningStyle()
        );

        // -----------------------------------------------------
        // Skills
        // -----------------------------------------------------

        profile.setSkills(
                normalizeSet(
                        request.skills()
                )
        );

        // -----------------------------------------------------
        // Interests
        // -----------------------------------------------------

        profile.setInterests(
                normalizeSet(
                        request.interests()
                )
        );

        UserProfile savedProfile =
                profileRepository.save(profile);

        return profileMapper.toResponse(
                savedProfile
        );
    }

    // =========================================================
    // CREATE DEFAULT PROFILE
    // =========================================================

    private UserProfile createDefaultProfile(
            UUID userId) {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found"
                                ));

        UserProfile profile =
                UserProfile.builder()
                        .user(user)
                        .skills(new HashSet<>())
                        .interests(new HashSet<>())
                        .build();

        return profileRepository.save(profile);
    }

    // =========================================================
    // STRING NORMALIZATION
    // =========================================================

    private String normalize(
            String value) {

        if (value == null) {
            return null;
        }

        String normalized =
                value.trim();

        return normalized.isBlank()
                ? null
                : normalized;
    }

    // =========================================================
    // COLLECTION NORMALIZATION
    // =========================================================

    private Set<String> normalizeSet(
            Set<String> values) {

        if (values == null ||
                values.isEmpty()) {

            return new HashSet<>();
        }

        Set<String> result =
                new HashSet<>();

        for (String value : values) {

            if (value == null) {
                continue;
            }

            String normalized =
                    value.trim()
                            .toLowerCase();

            if (!normalized.isBlank()) {
                result.add(normalized);
            }
        }

        return result;
    }
}