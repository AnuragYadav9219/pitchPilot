package com.virtualmento.user.service;

import java.util.UUID;

import com.virtualmento.user.dto.UpdateUserRequest;
import com.virtualmento.user.dto.UserResponse;

public interface UserService {
    
    UserResponse getById(UUID userId);

    UserResponse getCurrentUser();

    UserResponse updateCurrentUser(UpdateUserRequest request);
}
