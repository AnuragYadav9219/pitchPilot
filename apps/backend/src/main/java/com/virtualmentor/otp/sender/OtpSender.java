package com.virtualmentor.otp.sender;

import com.virtualmentor.otp.entity.OtpChannel;
import com.virtualmentor.otp.model.OtpMessage;

public interface OtpSender {

    boolean supports(OtpChannel channel);

    void send(OtpMessage message);
}