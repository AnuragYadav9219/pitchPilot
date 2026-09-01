package com.virtualmentor.user.service;

import java.util.UUID;

import com.virtualmentor.user.dto.UpdateUserRequest;
import com.virtualmentor.user.dto.UserResponse;

public interface UserService {

    UserResponse getById(UUID userId);

    UserResponse getCurrentUser();

    UserResponse updateCurrentUser(UpdateUserRequest request);
}
