package com.virtualmentor.user.service;

import java.util.UUID;

import com.virtualmentor.user.dto.UpdateUserProfileRequest;
import com.virtualmentor.user.dto.UserProfileResponse;
import com.virtualmentor.user.entity.UserProfile;

public interface UserProfileService {

    UserProfileResponse getMyProfile();

    UserProfileResponse updateMyProfile(UpdateUserProfileRequest request);

    UserProfile getOrCreateProfile(UUID userId);
}
