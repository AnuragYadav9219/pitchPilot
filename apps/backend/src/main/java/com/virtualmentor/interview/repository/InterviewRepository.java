package com.virtualmentor.interview.repository;

import com.virtualmentor.interview.entity.Interview;
import com.virtualmentor.interview.enums.InterviewStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

        List<Interview> findByUserIdOrderByCreatedAtDesc(UUID userId);

        Page<Interview> findByUserIdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

        Optional<Interview> findByIdAndUserId(Long id, UUID userId);

        List<Interview> findByStatus(InterviewStatus status);

        Optional<Interview> findByProviderSessionId(String providerSessionId);

        long countByUserIdAndStatus(
                        UUID userId,
                        InterviewStatus status);

        long countByUserId(UUID userId);

        List<Interview> findTop5ByUserIdAndStatusOrderByCompletedAtDesc(
                        UUID userId,
                        InterviewStatus status);

        List<Interview> findByUserIdAndIdIn(UUID userId, Collection<Long> ids);

        @Query("""
                                SELECT COALESCE(SUM(i.durationMinutes), 0)
                                FROM Interview i
                                WHERE i.userId = :userId
                                AND i.status = :status
                        """)
        Integer sumDurationByUserIdAndStatus(
                        @Param("userId") UUID userId,
                        @Param("status") InterviewStatus status);
}