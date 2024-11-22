package com.inn.pcda.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.service.impl.RegistrationService;

@RestController
@RequestMapping("/auth")
public class RegistrationController {
    
     @Autowired
    private RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequestDTO request) {
        registrationService.registerUser(request);
        return ResponseEntity.ok("User registered successfully");
    }
}
