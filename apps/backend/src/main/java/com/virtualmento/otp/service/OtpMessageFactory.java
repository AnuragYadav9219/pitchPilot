package com.virtualmento.otp.service;

import org.springframework.stereotype.Component;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpPurpose;
import com.virtualmento.otp.model.OtpMessage;
import com.virtualmento.user.entity.User;

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

                Your VirtualMento verification code is:

                %s

                This code expires in 5 minutes.

                Do not share this code with anyone.

                If you did not request this code,
                you can safely ignore this message.

                Regards,
                VirtualMento Team
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
                "VirtualMento Password Reset OTP";

            case EMAIL_VERIFICATION ->
                "VirtualMento Email Verification OTP";

            case LOGIN_VERIFICATION ->
                "VirtualMento Login Verification OTP";

            case PHONE_VERIFICATION ->
                "VirtualMento Phone Verification OTP";

            case CHANGE_EMAIL ->
                "VirtualMento Email Change OTP";

            case CHANGE_PHONE ->
                "VirtualMento Phone Change OTP";

            case TWO_FACTOR_AUTH ->
                "VirtualMento Security Verification";

            case SENSITIVE_ACTION ->
                "VirtualMento Security OTP";
        };
    }
}