package com.inn.pcda.users.service;

public interface RecaptchaValidationService {
    
    public boolean validateCaptcha(String recaptchaResponse);
}
