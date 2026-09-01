package com.virtualmentor.notification.email;

public interface EmailSender {

    void send(
            String receipient,
            String subject,
            String htmlContent);
}
