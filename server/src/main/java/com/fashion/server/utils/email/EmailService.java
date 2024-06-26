package com.fashion.server.utils.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender {

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Value("${client.url}")
    private String clientUrl;

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Override
    @Async
    public void sendOtp(String email, String otp) {
        try {
            String subject = "OTP for Fashion Store";
            String htmlContent = generateOtpHtmlContent(otp);
            sendEmail(email, subject, htmlContent);
        } catch (MessagingException | UnsupportedEncodingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }


    @Override
    @Async
    public void sendResetPasswordLink(String email, String token) {
        try {
            String subject = "Reset Password for Fashion Store";
            String resetLink = clientUrl + "/auth/change-password?token=" + token;
            String htmlContent = generateResetPasswordHtmlContent(resetLink);
            sendEmail(email, subject, htmlContent);
        } catch (MessagingException | UnsupportedEncodingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }


    private void sendEmail(String email, String subject, String htmlContent) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");
        helper.setText(htmlContent, true);
        helper.setTo(email.trim());
        helper.setSubject(subject);
        helper.setFrom(new InternetAddress(mailUsername, "Fashion Store"));
        LOGGER.info("Sending email from: {}", mailUsername);
        mailSender.send(message);
    }

    private String generateOtpHtmlContent(String otp) {
        return "<div style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
                "<h2 style='color: #4CAF50;'>Your OTP Code: <strong style='font-size: 24px; color: #000;'>" + otp + "</strong></h2>" +
                "<p style='font-size: 16px;'>Hello Friend,</p>" +
                "<p style='font-size: 16px;'>Thank you for using our service. Please use the above OTP to complete your verification process.</p>" +
                "<p style='font-size: 16px; color: red;'>Note: This OTP is valid for 15 minutes.</p>" +
                "<p style='font-size: 16px;'>If you did not request this OTP, please ignore this email.</p>" +
                "<p style='font-size: 16px;'>Best regards,</p>" +
                "<p style='font-size: 16px;'>The Fashion Store Team</p>" +
                "</div>";
    }

    private String generateResetPasswordHtmlContent(String resetLink) {
        return "<div style='font-family: Arial, sans-serif; line-height: 1.6;'>" +
                "<h2 style='color: #4CAF50;'>Click the link below to reset your password:</h2>" +
                "<p style='font-size: 16px;'><a href='" + resetLink + "'>Reset Password</a></p>" +
                "<p style='font-size: 16px;'>Hello Friend,</p>" +
                "<p style='font-size: 16px;'>Thank you for using our service. If you did not request this password reset, please ignore this email.</p>" +
                "<p style='font-size: 16px;'>Best regards,</p>" +
                "<p style='font-size: 16px;'>The Fashion Store Team</p>" +
                "</div>";
    }
}
