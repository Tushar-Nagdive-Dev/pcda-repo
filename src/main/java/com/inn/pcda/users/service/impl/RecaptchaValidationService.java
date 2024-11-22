package com.inn.pcda.users.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecaptchaValidationService implements com.inn.pcda.users.service.RecaptchaValidationService{

    @Value("${recaptcha.secret}")
    private String recaptchaSecret;

    @Value("${recaptcha.verify.url}")
    private String recaptchaVerifyUrl;

    @Override
    public boolean validateCaptcha(String recaptchaResponse) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();
        params.put("secret", recaptchaSecret);
        params.put("response", recaptchaResponse);

        Map<String, Object> response = restTemplate.postForObject(recaptchaVerifyUrl, params, Map.class);
        return response != null && (Boolean) response.get("success");
    }
    
}
