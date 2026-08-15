package com.virtualmento.conversation.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.virtualmento.conversation.entity.ConversationMessage;
import com.virtualmento.conversation.repository.ConversationMessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConversationMessageStatusService {

    private final ConversationMessageRepository repository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void markFailed(
            UUID messageId,
            String errorCode) {

        ConversationMessage message = repository
                .findById(messageId)
                .orElseThrow();

        message.markFailed(errorCode);

        repository.save(message);
    }
}
