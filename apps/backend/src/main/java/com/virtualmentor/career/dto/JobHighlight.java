package com.virtualmentor.career.dto;

import java.util.List;

public record JobHighlight(
        String title,
        List<String> items) {
}