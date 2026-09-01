package com.virtualmentor.user.dto;

import java.time.Instant;
import java.util.UUID;

import com.virtualmentor.common.enums.Role;

public record UserResponse(
                UUID id,
                String fullName,
                String email,
                String phoneNumber,
                Role role,
                Boolean enabled,
                Boolean emailVerified,
                Boolean phoneVerified,
                Instant createdAt,
                Instant updatedAt) {

}
