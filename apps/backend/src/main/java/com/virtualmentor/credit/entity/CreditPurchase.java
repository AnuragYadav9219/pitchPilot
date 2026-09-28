package com.virtualmentor.credit.entity;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "credit_purchases", indexes = {
        @Index(name = "idx_credit_purchase_user", columnList = "user_id"),
        @Index(name = "idx_credit_purchase_order", columnList = "provider_order_id"),
        @Index(name = "idx_credit_purchase_payment", columnList = "provider_payment_id")
})
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreditPurchase {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "package_code", nullable = false)
    private String packageCode;

    @Column(nullable = false)
    private long credits;

    @Column(name = "amount_in_paise", nullable = false)
    private long amountInPaise;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CreditPurchaseStatus status;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "provider_order_id")
    private String providerOrderId;

    @Column(name = "provider_payment_id")
    private String providerPaymentId;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @Column(name = "completed_at")
    private Instant completedAt;
}