package com.virtualmento.otp.service;

import org.springframework.stereotype.Component;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.entity.OtpPurpose;
import com.virtualmento.otp.exception.InvalidOtpException;
import com.virtualmento.otp.model.OtpDestination;
import com.virtualmento.user.entity.User;

@Component
public class OtpDestinationResolver {

    public OtpDestination resolve(
            User user,
            OtpPurpose purpose,
            OtpChannel channel) {

        if (user == null) {
            throw new InvalidOtpException();
        }

        return switch (channel) {

            // =====================================================
            // EMAIL
            // =====================================================

            case EMAIL -> {

                String email = user.getEmail();

                if (email == null ||
                        email.isBlank()) {

                    throw new InvalidOtpException();
                }

                /*
                 * EMAIL_VERIFICATION is specifically used to
                 * verify an email that is not verified yet.
                 *
                 * Therefore we MUST NOT require
                 * emailVerified == true here.
                 */
                if (purpose != OtpPurpose.EMAIL_VERIFICATION &&
                        !Boolean.TRUE.equals(
                                user.getEmailVerified())) {

                    throw new InvalidOtpException();
                }

                yield new OtpDestination(
                        OtpChannel.EMAIL,
                        email.trim().toLowerCase());
            }

            // =====================================================
            // SMS
            // =====================================================

            case SMS -> {

                String phoneNumber = user.getPhoneNumber();

                if (phoneNumber == null ||
                        phoneNumber.isBlank()) {

                    throw new InvalidOtpException();
                }

                /*
                 * PHONE_VERIFICATION is used to verify a phone
                 * number for the first time.
                 */
                if (purpose != OtpPurpose.PHONE_VERIFICATION &&
                        !Boolean.TRUE.equals(
                                user.getPhoneVerified())) {

                    throw new InvalidOtpException();
                }

                yield new OtpDestination(
                        OtpChannel.SMS,
                        phoneNumber.trim());
            }
        };
    }
}