package com.virtualmentor.otp.service;

import org.springframework.stereotype.Component;

import com.virtualmentor.otp.entity.OtpChannel;
import com.virtualmentor.otp.entity.OtpPurpose;
import com.virtualmentor.otp.model.OtpMessage;
import com.virtualmentor.user.entity.User;

@Component
public class OtpMessageFactory {

    public OtpMessage create(
            User user,
            OtpPurpose purpose,
            OtpChannel channel,
            String target,
            String otp) {

        String subject = getSubject(purpose);

        String content = """
                Hello %s,

                Your VirtualMentor verification code is:

                %s

                This code expires in 5 minutes.

                Do not share this code with anyone.

                If you did not request this code,
                you can safely ignore this message.

                Regards,
                VirtualMentor Team
                """
                .formatted(
                        user.getFullName(),
                        otp);

        return new OtpMessage(
                channel,
                target,
                subject,
                content);
    }

    private String getSubject(
            OtpPurpose purpose) {

        return switch (purpose) {

            case PASSWORD_RESET ->
                "VirtualMentor Password Reset OTP";

            case EMAIL_VERIFICATION ->
                "VirtualMentor Email Verification OTP";

            case LOGIN_VERIFICATION ->
                "VirtualMentor Login Verification OTP";

            case PHONE_VERIFICATION ->
                "VirtualMentor Phone Verification OTP";

            case CHANGE_EMAIL ->
                "VirtualMentor Email Change OTP";

            case CHANGE_PHONE ->
                "VirtualMentor Phone Change OTP";

            case TWO_FACTOR_AUTH ->
                "VirtualMentor Security Verification";

            case SENSITIVE_ACTION ->
                "VirtualMentor Security OTP";
        };
    }
}