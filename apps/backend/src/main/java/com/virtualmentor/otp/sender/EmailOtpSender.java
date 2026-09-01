package com.virtualmentor.otp.sender;

import org.springframework.stereotype.Service;

import com.virtualmentor.otp.entity.OtpChannel;
import com.virtualmentor.otp.model.OtpMessage;
import com.virtualmentor.notification.email.EmailSender;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailOtpSender implements OtpSender {

    private final EmailSender emailSender;

    @Override
    public boolean supports(OtpChannel channel) {

        return channel == OtpChannel.EMAIL;
    }

    @Override
    public void send(OtpMessage message) {

        emailSender.send(
                message.target(),
                message.subject(),
                message.content());
    }
}