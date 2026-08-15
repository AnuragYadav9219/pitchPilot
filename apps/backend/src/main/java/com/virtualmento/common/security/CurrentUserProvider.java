package com.virtualmento.common.security;

import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.virtualmento.common.exception.UnauthorizedException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CurrentUserProvider {

    public UUID getUserId() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("No authenticated user");
        }

        try {
            return UUID.fromString(
                    authentication.getName());
        } catch (IllegalArgumentException ex) {
            throw new UnauthorizedException("Unauthorised access");
        }
    }
}
