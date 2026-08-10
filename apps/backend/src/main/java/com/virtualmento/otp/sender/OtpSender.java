package com.virtualmento.otp.sender;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.model.OtpMessage;

public interface OtpSender {

    boolean supports(OtpChannel channel);

    void send(OtpMessage message);
}