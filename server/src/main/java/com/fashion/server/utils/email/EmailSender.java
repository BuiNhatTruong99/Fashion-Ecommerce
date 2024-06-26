package com.fashion.server.utils.email;

import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface EmailSender {
    void sendOtp(String email, String otp) throws MessagingException, UnsupportedEncodingException;

    void sendResetPasswordLink(String email, String token) throws MessagingException, UnsupportedEncodingException;
}
