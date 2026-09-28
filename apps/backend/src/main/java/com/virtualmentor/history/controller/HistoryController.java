package com.virtualmentor.history.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmentor.common.response.ApiResponse;
import com.virtualmentor.common.response.ResponseBuilder;
import com.virtualmentor.common.security.CurrentUserProvider;
import com.virtualmentor.history.dto.HistoryItemResponse;
import com.virtualmentor.history.service.HistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;
    private final CurrentUserProvider currentUserProvider;
    private final ResponseBuilder responseBuilder;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<HistoryItemResponse>>> getHistory(
            @PageableDefault(size = 5, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        Page<HistoryItemResponse> history = historyService.getHistory(
                currentUserProvider.getUserId(),
                pageable);

        return responseBuilder.ok(
                "Interview history fetched successfully",
                history);
    }
}