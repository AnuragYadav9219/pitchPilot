package com.virtualmentor.usage.repository;

import com.virtualmentor.usage.entity.ApiUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ApiUsageRepository extends JpaRepository<ApiUsage, Long> {

    List<ApiUsage> findByUserIdOrderByCreatedAtDesc(
            Long userId);

    List<ApiUsage> findByInterviewId(
            Long interviewId);

    List<ApiUsage> findByUserIdAndCreatedAtBetween(
            Long userId,
            LocalDateTime start,
            LocalDateTime end);
}