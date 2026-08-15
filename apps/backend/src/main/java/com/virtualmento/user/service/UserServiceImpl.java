package com.virtualmento.user.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.common.exception.ResourceAlreadyExistsException;
import com.virtualmento.common.exception.ResourceNotFoundException;
import com.virtualmento.common.security.CurrentUserProvider;
import com.virtualmento.user.dto.UpdateUserRequest;
import com.virtualmento.user.dto.UserResponse;
import com.virtualmento.user.entity.User;
import com.virtualmento.user.mapper.UserMapper;
import com.virtualmento.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CurrentUserProvider currentUserProvider;

    @Override
    public UserResponse getById(UUID userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return userMapper.toResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {

        User user = getCurrentUserEntity();

        return userMapper.toResponse(user);
    }

    @Override
    @Transactional
    public UserResponse updateCurrentUser(UpdateUserRequest request) {

        User user = getCurrentUserEntity();

        if (request.fullName() != null && !request.fullName().isBlank()) {
            user.setFullName(request.fullName().trim());
        }

        if (request.phoneNumber() != null && !request.phoneNumber().isBlank()) {
            String phoneNumber = request.phoneNumber().trim();

            if (!phoneNumber.equals(user.getPhoneNumber()) && userRepository.existsByPhoneNumber(phoneNumber)) {
                throw new ResourceAlreadyExistsException("Phone number already in use");
            }

            user.setPhoneNumber(phoneNumber);

            user.setPhoneVerified(false);
        }

        return userMapper.toResponse(user);
    }

    private User getCurrentUserEntity() {

        return userRepository.findById(currentUserProvider.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

}
