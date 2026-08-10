package com.virtualmento.notification.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;

    @Override
    public void send(String receipient, String subject, String htmlContent) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(receipient);
        message.setSubject(subject);
        message.setText(htmlContent);

        mailSender.send(message);
    }

}
