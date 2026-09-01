package com.virtualmentor.otp.service;

import com.virtualmentor.otp.entity.OtpChannel;
import com.virtualmentor.otp.entity.OtpPurpose;
import com.virtualmentor.user.entity.User;

public interface OtpService {

        void send(
                        User user,
                        OtpPurpose purpose,
                        OtpChannel channel);

        void verify(
                        User user,
                        OtpPurpose purpose,
                        OtpChannel channel,
                        String otp);
}