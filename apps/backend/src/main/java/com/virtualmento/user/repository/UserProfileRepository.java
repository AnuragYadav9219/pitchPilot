package com.virtualmento.user.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmento.user.entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {
    
    Optional<UserProfile> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);
}
