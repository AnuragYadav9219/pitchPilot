package com.virtualmentor.user.service;

import com.virtualmentor.user.dto.UpdateUserProfileRequest;
import com.virtualmentor.user.dto.UserProfileResponse;

public interface UserProfileService {

    UserProfileResponse getMyProfile();

    UserProfileResponse updateMyProfile(UpdateUserProfileRequest request);
}
