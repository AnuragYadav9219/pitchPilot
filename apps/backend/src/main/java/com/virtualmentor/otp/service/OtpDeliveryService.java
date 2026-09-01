package com.virtualmentor.otp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.virtualmentor.otp.model.OtpMessage;
import com.virtualmentor.otp.sender.OtpSender;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OtpDeliveryService {

        private final List<OtpSender> senders;

        public void send(OtpMessage message) {

                OtpSender sender = senders.stream()
                                .filter(s -> s.supports(
                                                message.channel()))
                                .findFirst()
                                .orElseThrow(() -> new IllegalStateException(
                                                "No OTP sender configured for "
                                                                + message.channel()));

                sender.send(message);
        }
}