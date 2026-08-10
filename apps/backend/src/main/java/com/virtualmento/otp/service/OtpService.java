package com.virtualmento.otp.service;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpPurpose;
import com.virtualmento.user.entity.User;

public interface OtpService {

    void send(
            User user,
            OtpPurpose purpose,
            OtpChannel channel
    );

    void verify(
            User user,
            OtpPurpose purpose,
            OtpChannel channel,
            String otp
    );
}