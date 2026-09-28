package com.virtualmentor.resume.repository;

import com.virtualmentor.resume.entity.Resume;
import com.virtualmentor.resume.enums.ResumeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUserIdOrderByCreatedAtDesc(
            UUID userId);

    Optional<Resume> findByIdAndUserId(
            Long id,
            UUID userId);

    List<Resume> findByUserIdAndStatus(
            UUID userId,
            ResumeStatus status);

    Optional<Resume> findFirstByUserIdOrderByCreatedAtDesc(
            UUID userId);
}