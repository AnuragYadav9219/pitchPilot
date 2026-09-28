package com.virtualmentor.credit.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmentor.credit.dto.CreditBalanceResponse;
import com.virtualmentor.credit.dto.CreditTransactionResponse;
import com.virtualmentor.credit.entity.CreditTransaction;
import com.virtualmentor.credit.entity.CreditTransactionType;
import com.virtualmentor.credit.entity.CreditWallet;
import com.virtualmentor.credit.exception.InsufficientCreditsException;
import com.virtualmentor.credit.repository.CreditTransactionRepository;
import com.virtualmentor.credit.repository.CreditWalletRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CreditServiceImpl implements CreditService {

        private final CreditWalletRepository walletRepository;
        private final CreditTransactionRepository transactionRepository;

        // =============================================================
        // BALANCE
        // =============================================================

        @Override
        @Transactional(readOnly = true)
        public CreditBalanceResponse getBalance(UUID userId) {

                CreditWallet wallet = walletRepository
                                .findByUserId(userId)
                                .orElse(null);

                if (wallet == null) {
                        return new CreditBalanceResponse(
                                        userId,
                                        0L,
                                        0L,
                                        0L);
                }

                long balance = wallet.getBalance();
                long reserved = wallet.getReservedBalance();
                long available = balance - reserved;

                return new CreditBalanceResponse(
                                userId,
                                balance,
                                reserved,
                                available);
        }

        // =============================================================
        // GRANT
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void grant(
                        UUID userId,
                        long amount,
                        CreditTransactionType type,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = getOrCreateWallet(userId);

                wallet.setBalance(wallet.getBalance() + amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                amount,
                                type,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);

                log.info(
                                "Wallet AFTER grant: balance={}, reserved={}",
                                wallet.getBalance(),
                                wallet.getReservedBalance());

                log.info("========== CREDIT GRANT COMPLETE ==========");
        }

        // =============================================================
        // DIRECT CONSUME
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void consume(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = getOrCreateWallet(userId);

                long available = wallet.getBalance()
                                - wallet.getReservedBalance();

                if (available < amount) {
                        throw new InsufficientCreditsException(
                                        "Insufficient credits");
                }

                wallet.setBalance(
                                wallet.getBalance() - amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                -amount,
                                CreditTransactionType.USAGE,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);
        }

        // =============================================================
        // REFUND
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void refund(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = getOrCreateWallet(userId);

                wallet.setBalance(
                                wallet.getBalance() + amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                amount,
                                CreditTransactionType.REFUND,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);
        }

        // =============================================================
        // RESERVE
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void reserve(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = getOrCreateWallet(userId);

                long available = wallet.getBalance() - wallet.getReservedBalance();

                if (available < amount) {
                        throw new InsufficientCreditsException("Insufficient credits");
                }

                wallet.setReservedBalance(wallet.getReservedBalance() + amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                amount,
                                CreditTransactionType.RESERVATION,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);
        }

        // =============================================================
        // CONSUME RESERVATION
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void consumeReservation(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = walletRepository.findByUserIdForUpdate(userId)
                                .orElseThrow(() -> new IllegalStateException("Credit wallet not found"));

                if (wallet.getReservedBalance() < amount) {
                        throw new IllegalStateException("Insufficient reserved credits");
                }

                wallet.setReservedBalance(wallet.getReservedBalance() - amount);
                wallet.setBalance(wallet.getBalance() - amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                -amount,
                                CreditTransactionType.USAGE,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);
        }

        // =============================================================
        // RELEASE RESERVATION
        // =============================================================

        @Override
        @Transactional(propagation = Propagation.REQUIRES_NEW)
        public void releaseReservation(
                        UUID userId,
                        long amount,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                validateAmount(amount);

                if (isAlreadyProcessed(idempotencyKey)) {
                        return;
                }

                CreditWallet wallet = walletRepository.findByUserIdForUpdate(userId)
                                .orElseThrow(() -> new IllegalStateException(
                                                "Credit wallet not found"));

                if (wallet.getReservedBalance() < amount) {
                        throw new IllegalStateException(
                                        "Insufficient reserved credits");
                }

                wallet.setReservedBalance(
                                wallet.getReservedBalance() - amount);

                walletRepository.save(wallet);

                saveTransaction(
                                userId,
                                0L,
                                CreditTransactionType.RESERVATION_RELEASE,
                                action,
                                referenceId,
                                idempotencyKey,
                                description);
        }

        // =============================================================
        // PRIVATE
        // =============================================================

        private CreditWallet getOrCreateWallet(UUID userId) {

                return walletRepository
                                .findByUserIdForUpdate(userId)
                                .orElseGet(() -> walletRepository.save(
                                                CreditWallet.builder()
                                                                .userId(userId)
                                                                .balance(0L)
                                                                .reservedBalance(0L)
                                                                .build()));
        }

        private boolean isAlreadyProcessed(
                        String idempotencyKey) {

                return transactionRepository
                                .findByIdempotencyKey(idempotencyKey)
                                .isPresent();
        }

        private void saveTransaction(
                        UUID userId,
                        long amount,
                        CreditTransactionType type,
                        String action,
                        UUID referenceId,
                        String idempotencyKey,
                        String description) {

                CreditTransaction transaction = CreditTransaction.builder()
                                .userId(userId)
                                .amount(amount)
                                .type(type)
                                .action(action)
                                .referenceId(referenceId)
                                .idempotencyKey(idempotencyKey)
                                .description(description)
                                .build();

                transactionRepository.save(transaction);
        }

        private void validateAmount(long amount) {

                if (amount <= 0) {
                        throw new IllegalArgumentException(
                                        "Credit amount must be greater than zero");
                }
        }

        @Override
        public Page<CreditTransactionResponse> getTransactions(UUID userId, Pageable pageable) {

                return transactionRepository
                                .findByUserIdOrderByCreatedAtDesc(userId, pageable)
                                .map(transaction -> new CreditTransactionResponse(
                                                transaction.getId(),
                                                transaction.getAmount(),
                                                transaction.getType(),
                                                transaction.getAction(),
                                                transaction.getDescription(),
                                                transaction.getCreatedAt()));
        }

        @Override
        public boolean hasReservation(UUID userId, UUID referenceId) {

                return transactionRepository
                                .existsByUserIdAndReferenceIdAndType(
                                                userId,
                                                referenceId,
                                                CreditTransactionType.RESERVATION);
        }
}