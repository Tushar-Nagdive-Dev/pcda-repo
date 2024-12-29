package com.inn.pcda.common.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.inn.pcda.common.service.IEmailService;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Sends OTP to the provided email ID.
     *
     * @param toEmail Recipient email address.
     * @return Message indicating success or failure.
     */
    @Override
    public String sendOtp(String toEmail, String otp) {
        try {

            // Create email message
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Your OTP Code");
            message.setText("Your OTP is: " + otp);

            // Send email
            mailSender.send(message);

            log.info("OTP sent to email: {}", toEmail);
            return "OTP sent successfully to " + toEmail;
        } catch (Exception e) {
            log.error("Error sending OTP to email: {}", toEmail, e);
            throw new RuntimeException(e.getMessage());
        }
    }

}
