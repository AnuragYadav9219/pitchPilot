package com.virtualmento.user.dto;

import java.util.UUID;

import com.virtualmento.common.enums.Role;

public record UserResponse(
                UUID id,
                String fullName,
                String email,
                Role role,
                Boolean enabled,
                Boolean emailVerified) {

}
