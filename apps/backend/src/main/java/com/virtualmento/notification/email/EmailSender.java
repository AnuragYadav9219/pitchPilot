package com.virtualmento.notification.email;

public interface EmailSender {

    void send(
            String receipient,
            String subject,
            String htmlContent);
}
