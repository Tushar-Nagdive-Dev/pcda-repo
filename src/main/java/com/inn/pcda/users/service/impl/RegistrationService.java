package com.inn.pcda.users.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.entity.UserConfigs;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.RoleRepository;
import com.inn.pcda.users.repository.UserConfigRepository;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.RecaptchaValidationService;

import jakarta.transaction.Transactional;

@Service
public class RegistrationService {
    
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RecaptchaValidationService recaptchaValidationService;

    @Autowired
    private UserConfigRepository userConfigRepo;

    @Transactional
    public void registerUser(RegistrationRequestDTO registrationRequest) {
        if(!recaptchaValidationService.validateCaptcha(registrationRequest.getRecaptchaResponse())) {
            throw new IllegalArgumentException("Invalid reCAPTCHA");
        }

        if(this.userRepo.existsByUsername(registrationRequest.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        if(this.userRepo.existsByEmail(registrationRequest.getEmail())) {
            throw new IllegalArgumentException("Provided Email Already in use");
        }

        Users user = new Users();
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setEmail(registrationRequest.getEmail());
        user.setRole(roleRepo.findByName(registrationRequest.getRoleName()).orElseThrow(() -> new IllegalArgumentException("Invalid role name"))); 
        user = this.userRepo.save(user);

        // Create and save the UserConfig
        UserConfigs userConfigs = new UserConfigs();
        userConfigs.setUser(user);
        userConfigs.setPasswordCounter(0);
        userConfigs.setPasswordResetStatus('N');
        userConfigs.setTermAndCondition('N');
        userConfigs.setEmailVerifiedCount(0);
        userConfigs.setMobileVerifiedCount(0);
        this.userConfigRepo.save(userConfigs);
    }
}
