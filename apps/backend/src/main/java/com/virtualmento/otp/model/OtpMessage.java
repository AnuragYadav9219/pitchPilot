package com.virtualmento.otp.model;

import com.virtualmento.otp.entity.OtpChannel;

public record OtpMessage(

        OtpChannel channel,

        String target,

        String subject,

        String content

) {
}