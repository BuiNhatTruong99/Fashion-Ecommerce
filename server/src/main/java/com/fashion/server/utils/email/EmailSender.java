package com.fashion.server.utils.email;

public interface EmailSender {
    void sendOtp(String email, String otp);
}
