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

import com.inn.pcda.configs.baseimplementation.baseservice.ICaptchaService;
import com.inn.pcda.configs.utils.JwtUtil;
import com.inn.pcda.exceptions.RegistrationException;
import com.inn.pcda.users.dto.LoginRequestDTO;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.service.impl.RegistrationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@Slf4j
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

    @Operation(
            summary = "Login user",
            description = "Authenticate the user using username, password, and captcha. Returns a JWT token if successful."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "400", description = "Invalid username, password, or captcha")
    })
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequestDTO loginRequet) {
        Map<String, String> response = new HashMap<>();

        log.info("@AuthController method login :{}", loginRequet);
        
        // Validate custom captcha
        boolean isCaptchaValid = captchaService.validateCaptcha(loginRequet.getCaptchaToken(), loginRequet.getCaptchaInput());
        log.info("@AuthController method login isCaptchaValid: {}", isCaptchaValid);
        
        if (!isCaptchaValid) {
            log.info("@AuthController method login !isCaptchaValid: Invalid captcha");
            response.put("status", "error");
            response.put("message", "Invalid captcha. Please try again.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequet.getUsername(), loginRequet.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("@AuthController method login authentication successful: {}", authentication);

            // Generate JWT Token
            String token = jwtUtil.generateToken(authentication);
            log.info("login token: {}", token);

            response.put("status", "success");
            response.put("message", "Login successful.");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("login exception: {}", e.getMessage(), e);

            response.put("status", "error");
            response.put("message", "Invalid username or password.");
            response.put("token", null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @Operation(
            summary = "Generate captcha",
            description = "Generates a new captcha token and image for validation purposes."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Captcha generated successfully"),
            @ApiResponse(responseCode = "500", description = "Error generating captcha")
    })
    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generateCaptcha() {
        log.info("@AuthController method generateCaptcha: Generating new captcha");
        Map<String, String> captchaData = captchaService.generateCaptcha();
        log.info("@AuthController method generateCaptcha: Captcha generated successfully");
        return ResponseEntity.ok(captchaData);
    }

    @Operation(
            summary = "Register user",
            description = "Registers a new user by accepting registration details such as username, password, and other required fields."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Error during registration")
    })
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegistrationRequestDTO request) {
        Map<String, String> response = new HashMap<>();
        log.info("@AuthController method registerUser :{}", request);

        try {
            registrationService.registerUser(request);
            log.info("@AuthController method registerUser: User registered successfully");

            response.put("status", "success");
            response.put("message", "User registered successfully! Please log in.");
            return ResponseEntity.ok(response);
        } catch (RegistrationException e) {
            log.error("@AuthController method registerUser exception: {}", e.getMessage(), e);

            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
