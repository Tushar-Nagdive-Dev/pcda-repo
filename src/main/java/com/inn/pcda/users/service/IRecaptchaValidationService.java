package com.inn.pcda.users.service;

public interface IRecaptchaValidationService {
    public boolean validateCaptcha(String recaptchaResponse);
}
