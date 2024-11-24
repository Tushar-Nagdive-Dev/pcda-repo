package com.inn.pcda.users.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.exceptions.RegistrationException;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.service.impl.RecaptchaValidationService;
import com.inn.pcda.users.service.impl.RegistrationService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RecaptchaValidationService recaptchaValidationService;

    @Autowired
    private RegistrationService registrationService;

    /**
     * Login API (POST)
     */
    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam("g-recaptcha-response") String recaptchaResponse) {
        Map<String, Object> response = new HashMap<>();

        // Validate reCAPTCHA
        if (!recaptchaValidationService.validateCaptcha(recaptchaResponse)) {
            response.put("status", "error");
            response.put("message", "Invalid reCAPTCHA. Please try again.");
            return response;
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            response.put("status", "success");
            response.put("message", "Login successful.");
            return response;
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Invalid username or password.");
            return response;
        }
    }

    /**
     * Registration API (POST)
     */
    @PostMapping("/register")
    public Map<String, Object> registerUser(@RequestBody RegistrationRequestDTO request) {
        Map<String, Object> response = new HashMap<>();
        try {
            registrationService.registerUser(request);
            response.put("status", "success");
            response.put("message", "User registered successfully! Please log in.");
            return response;
        } catch (RegistrationException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            return response;
        }
    }
}
