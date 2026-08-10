package com.virtualmento.logging.repository;

import java.util.List;
import java.util.UUID;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.virtualmento.logging.entity.SecurityAuditLog;

public interface SecurityAuditLogRepository
        extends JpaRepository<SecurityAuditLog, UUID> {

    List<SecurityAuditLog> findByUserIdOrderByCreatedAtDesc(
            UUID userId,
            Pageable pageable);

    List<SecurityAuditLog> findByEmailOrderByCreatedAtDesc(
            String email,
            Pageable pageable);
}