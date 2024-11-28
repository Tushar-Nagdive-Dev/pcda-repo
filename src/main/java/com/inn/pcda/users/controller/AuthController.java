package com.inn.pcda.users.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.inn.pcda.configs.baseImplementation.baseservice.ICaptchaService;
import com.inn.pcda.configs.utils.JwtUtil;
import com.inn.pcda.exceptions.RegistrationException;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.service.impl.RegistrationService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private ICaptchaService captchaService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Login API (POST)
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String captchaToken,
            @RequestParam String captchaInput) {
        Map<String, String> response = new HashMap<>();

        // Validate custom captcha
        boolean isCaptchaValid = captchaService.validateCaptcha(captchaToken, captchaInput);
        if (!isCaptchaValid) {
            response.put("status", "error");
            response.put("message", "Invalid captcha. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generate JWT Token
            String token = jwtUtil.generateToken(authentication);

            response.put("status", "success");
            response.put("message", "Login successful.");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Invalid username or password.");
            response.put("token", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Generate Captcha API (GET)
     */
    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generateCaptcha() {
        Map<String, String> captchaData = captchaService.generateCaptcha();
        return ResponseEntity.ok(captchaData);
    }

    /**
     * Registration API (POST)
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegistrationRequestDTO request) {
        Map<String, String> response = new HashMap<>();
        try {
            registrationService.registerUser(request);
            response.put("status", "success");
            response.put("message", "User registered successfully! Please log in.");
            return ResponseEntity.ok(response);
        } catch (RegistrationException e) {
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
