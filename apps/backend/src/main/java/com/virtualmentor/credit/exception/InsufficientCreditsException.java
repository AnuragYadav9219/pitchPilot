package com.virtualmentor.credit.exception;

import com.virtualmentor.common.exception.BadRequestException;

public class InsufficientCreditsException
        extends BadRequestException {

    public InsufficientCreditsException(String message) {
        super(message);
    }
}