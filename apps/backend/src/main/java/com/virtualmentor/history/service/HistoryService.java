package com.virtualmentor.history.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.virtualmentor.history.dto.HistoryItemResponse;

public interface HistoryService {

    Page<HistoryItemResponse> getHistory(
            UUID userId,
            Pageable pageable);
}