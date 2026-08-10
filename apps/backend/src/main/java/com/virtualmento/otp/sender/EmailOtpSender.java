package com.virtualmento.otp.sender;

import org.springframework.stereotype.Service;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.model.OtpMessage;
import com.virtualmento.notification.email.EmailSender;

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