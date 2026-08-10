package com.virtualmento.user.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserIdentityService {

    private final UserRepository userRepository;

    public Optional<User> findByIdentifier(
            String identifier) {

        if (identifier == null ||
                identifier.isBlank()) {

            return Optional.empty();
        }

        String normalized = identifier.trim();

        if (normalized.contains("@")) {

            return userRepository.findByEmail(
                    normalized.toLowerCase());
        }

        return userRepository.findByPhoneNumber(
                normalized);
    }

    public Optional<User> findForChannel(
            String identifier,
            OtpChannel channel) {

        if (identifier == null ||
                identifier.isBlank()) {

            return Optional.empty();
        }

        String normalized = identifier.trim();

        return switch (channel) {

            case EMAIL ->
                userRepository.findByEmail(
                        normalized.toLowerCase());

            case SMS ->
                userRepository.findByPhoneNumber(
                        normalized);
        };
    }
}