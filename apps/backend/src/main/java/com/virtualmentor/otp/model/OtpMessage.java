package com.virtualmentor.otp.model;

import com.virtualmentor.otp.entity.OtpChannel;

public record OtpMessage(

                OtpChannel channel,

                String target,

                String subject,

                String content

) {
}