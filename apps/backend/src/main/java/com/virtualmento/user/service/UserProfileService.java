package com.virtualmento.user.service;

import com.virtualmento.user.dto.UpdateUserProfileRequest;
import com.virtualmento.user.dto.UserProfileResponse;

public interface UserProfileService {
    
    UserProfileResponse getMyProfile();

    UserProfileResponse updateMyProfile(UpdateUserProfileRequest request);
}
