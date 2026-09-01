package com.virtualmentor.user.mapper;

import org.springframework.stereotype.Component;

import com.virtualmentor.user.dto.UserResponse;
import com.virtualmentor.user.entity.User;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {

        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getEnabled(),
                user.getEmailVerified(),
                user.getPhoneVerified(),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }
}
