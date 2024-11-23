package com.inn.pcda.users.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.inn.pcda.users.service.IRecaptchaValidationService;

@Service
public class RecaptchaValidationService implements IRecaptchaValidationService{

    @Value("${recaptcha.secret:default-secret}")
    private String recaptchaSecret;

    @Value("${recaptcha.verify.url:https://www.google.com/recaptcha/api/siteverify}")
    private String recaptchaVerifyUrl;

    @Override
    public boolean validateCaptcha(String recaptchaResponse) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();
        params.put("secret", recaptchaSecret);
        params.put("response", recaptchaResponse);
    
        try {
            Map<String, Object> response = restTemplate.postForObject(recaptchaVerifyUrl, params, Map.class);
            return response != null && (Boolean) response.get("success");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
    
    
}
