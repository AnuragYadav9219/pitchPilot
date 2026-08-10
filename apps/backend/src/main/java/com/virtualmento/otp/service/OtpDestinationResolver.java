package com.virtualmento.otp.service;

import org.springframework.stereotype.Component;

import com.virtualmento.otp.entity.OtpChannel;
import com.virtualmento.otp.exception.InvalidOtpException;
import com.virtualmento.otp.model.OtpDestination;
import com.virtualmento.user.entity.User;

@Component
public class OtpDestinationResolver {

    public OtpDestination resolve(
            User user,
            OtpChannel channel) {

        return switch (channel) {

            case EMAIL -> {

                if (!Boolean.TRUE.equals(
                        user.getEmailVerified())) {

                    throw new InvalidOtpException();
                }

                yield new OtpDestination(
                        OtpChannel.EMAIL,
                        user.getEmail());
            }

            case SMS -> {

                if (!Boolean.TRUE.equals(
                        user.getPhoneVerified())) {

                    throw new InvalidOtpException();
                }

                if (user.getPhoneNumber() == null ||
                        user.getPhoneNumber().isBlank()) {

                    throw new InvalidOtpException();
                }

                yield new OtpDestination(
                        OtpChannel.SMS,
                        user.getPhoneNumber());
            }
        };
    }
}