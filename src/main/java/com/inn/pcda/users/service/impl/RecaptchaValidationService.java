package com.inn.pcda.users.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.HashMap;
import java.util.Map;

@Service
public class RecaptchaValidationService {

    @Value("${recaptcha.secret:6LeWR4kqAAAAADRTLtTGooVr_2zO1HHu9yUYUQVn}")
    private String recaptchaSecret;

    @Value("${recaptcha.verify.url:https://www.google.com/recaptcha/api/siteverify}")
    private String recaptchaVerifyUrl;

    public boolean validateCaptcha(String recaptchaResponse) {
        RestTemplate restTemplate = new RestTemplate();

        // Prepare request parameters
        Map<String, String> params = new HashMap<>();
        params.put("secret", recaptchaSecret);
        params.put("response", recaptchaResponse);

        // Make API call to Google reCAPTCHA
        ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
            recaptchaVerifyUrl,
            HttpMethod.POST,
            new HttpEntity<>(params),
            new ParameterizedTypeReference<>() {}
        );

        // Process response
        Map<String, Object> responseBody = responseEntity.getBody();
        return responseBody != null && Boolean.TRUE.equals(responseBody.get("success"));
    }
}
