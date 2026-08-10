package com.virtualmento.logging.entity;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "security_audit_logs", indexes = {
        @Index(name = "idx_security_audit_user_id", columnList = "user_id"),
        @Index(name = "idx_security_audit_event_type", columnList = "event_type"),
        @Index(name = "idx_security_audit_created_at", columnList = "created_at"),
        @Index(name = "idx_security_audit_email", columnList = "email")
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SecurityAuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SecurityEventType eventType;

    @Column(name = "user_id")
    private UUID userId;

    @Column(length = 320)
    private String email;

    @Column(length = 45)
    private String ipAddress;

    @Column(length = 1000)
    private String userAgent;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Column(length = 1000)
    private String metadata;
}
