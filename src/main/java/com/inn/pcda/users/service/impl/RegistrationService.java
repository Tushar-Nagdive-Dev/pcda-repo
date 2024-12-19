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
import com.inn.pcda.exceptions.RegistrationException;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RegistrationService {

    private static final Logger logger = LoggerFactory.getLogger(RegistrationService.class);

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
        logger.info("Starting registration for username: {}", registrationRequest.getUsername());

        // ReCAPTCHA validation
        if (!recaptchaValidationService.validateCaptcha(registrationRequest.getRecaptchaResponse())) {
            logger.warn("ReCAPTCHA validation failed for username: {}", registrationRequest.getUsername());
            throw new RegistrationException("Invalid reCAPTCHA. Please try again.");
        }

        // Username and Email duplication checks
        if (userRepo.existsByUsername(registrationRequest.getUsername())) {
            logger.warn("Username already exists: {}", registrationRequest.getUsername());
            throw new RegistrationException("Username already exists.");
        }

        if (userRepo.existsByEmail(registrationRequest.getEmail())) {
            logger.warn("Email already in use: {}", registrationRequest.getEmail());
            throw new RegistrationException("The provided email is already in use.");
        }

        // Creating user
        Users user = new Users();
        user.setUsername(registrationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setFirstName(registrationRequest.getFirstName());
        user.setLastName(registrationRequest.getLastName());
        user.setEmail(registrationRequest.getEmail());
        user.setRole(roleRepo.findByName(registrationRequest.getRoleName())
                .orElseThrow(() -> new RegistrationException("Invalid role name provided.")));

        user = userRepo.save(user);
        logger.info("User registered successfully with username: {}", user.getUsername());

        // Creating and saving UserConfig
        UserConfigs userConfigs = new UserConfigs();
        userConfigs.setUser(user);
        userConfigs.setPasswordCounter(0);
        userConfigs.setPasswordResetStatus('N');
        userConfigs.setTermAndCondition('N');
        userConfigs.setEmailVerifiedCount(0);
        userConfigs.setMobileVerifiedCount(0);
        userConfigRepo.save(userConfigs);

        logger.info("UserConfig created for user: {}", user.getUsername());
    }

    
}
