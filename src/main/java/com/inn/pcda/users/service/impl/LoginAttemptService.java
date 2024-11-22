package com.inn.pcda.users.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.inn.pcda.users.entity.LoginAttempt;
import com.inn.pcda.users.repository.LoginAttemptRepository;
import com.inn.pcda.users.service.ILoginAttemptService;

public class LoginAttemptService implements ILoginAttemptService{

    private static final Integer MAX_ATTEMPTS = 5;

    @Autowired
    private LoginAttemptRepository loginAttemptRepository;

    @Override
    public void recordFailedAttempt(String username, String ipAddress) {
        Optional<LoginAttempt> existingAttemps = loginAttemptRepository.findByUsernameAndIpAddress(username, ipAddress);

        if(existingAttemps.isPresent()) {
            LoginAttempt attempt = existingAttemps.get();
            attempt.setCounter(attempt.getCounter() + 1);
            attempt.setTimestamp(LocalDateTime.now());
            loginAttemptRepository.save(attempt);

            if(attempt.getCounter() >= MAX_ATTEMPTS) {
                throw new RuntimeException("Account locked due to too many failed login attempts.");
            }
        }else {
            LoginAttempt newAttempt = new LoginAttempt();
            newAttempt.setUsername(username);
            newAttempt.setIpAddress(ipAddress);
            newAttempt.setCounter(1);
            newAttempt.setTimestamp(LocalDateTime.now());
            loginAttemptRepository.save(newAttempt);
        }
    }

    @Override
    public void clearAttempts(String username) {
        loginAttemptRepository.deleteByUsername(username);
    }
    
}
