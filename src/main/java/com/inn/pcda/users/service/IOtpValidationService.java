package com.inn.pcda.users.service;

public interface IOtpValidationService {
    public String generateOtp(String email, String phoneNumber);
    public boolean verifyOtp(String email, String phoneNumber, String otp);
}
