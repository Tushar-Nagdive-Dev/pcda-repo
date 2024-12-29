package com.inn.pcda.users.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.users.service.IOtpValidationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/opt")
@Slf4j
@RequiredArgsConstructor
public class OtpValidationController {
    
    private final IOtpValidationService iOtpValidationService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateOtp(@RequestParam(required = false) String email,
                                              @RequestParam(required = false) String phoneNumber) {
        if (email == null && phoneNumber == null) {
            return ResponseEntity.badRequest().body("Either email or phone number must be provided.");
        }

        String response = iOtpValidationService.generateOtp(email, phoneNumber);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestParam(required = false) String email,
                                            @RequestParam(required = false) String phoneNumber,
                                            @RequestParam String otp) {
        if (email == null && phoneNumber == null) {
            return ResponseEntity.badRequest().body("Either email or phone number must be provided.");
        }

        boolean isVerified = iOtpValidationService.verifyOtp(email, phoneNumber, otp);
        if (isVerified) {
            return ResponseEntity.ok("OTP verified successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid or expired OTP.");
        }
    }
}
