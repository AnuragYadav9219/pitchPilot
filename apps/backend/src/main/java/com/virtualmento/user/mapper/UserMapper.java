package com.virtualmento.user.mapper;

import org.springframework.stereotype.Component;

import com.virtualmento.user.dto.UserResponse;
import com.virtualmento.user.entity.User;

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
                user.getRole(),
                user.getEnabled(),
                user.getEmailVerified());
    }
}
