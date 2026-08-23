package com.virtualmento.user.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmento.user.entity.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, UUID> {

    Optional<UserProfile> findByUserId(UUID userId);

    boolean existsByUserId(UUID userId);

    @Query("""
            SELECT DISTINCT p
            FROM UserProfile p
            JOIN FETCH p.user u
            LEFT JOIN FETCH p.skills
            LEFT JOIN FETCH p.interests
            WHERE u.id = :userId
            """)
    Optional<UserProfile> findByUserIdWithContext(
            @Param("userId") UUID userId);
}
