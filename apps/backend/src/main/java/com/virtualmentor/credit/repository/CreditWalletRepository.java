package com.virtualmentor.credit.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.virtualmentor.credit.entity.CreditWallet;

import jakarta.persistence.LockModeType;

public interface CreditWalletRepository extends JpaRepository<CreditWallet, UUID> {

    Optional<CreditWallet> findByUserId(UUID userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
            SELECT w
            FROM CreditWallet w
            WHERE w.userId = :userId
            """)
    Optional<CreditWallet> findByUserIdForUpdate(@Param("userId") UUID userId);
}