package com.inn.pcda.users.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.service.IUserReLoginService;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/officer")
@Slf4j
@RequiredArgsConstructor
public class UpdateOfficerController {

  private final IUserReLoginService userReLoginService;

    @GetMapping("/{accountNo}")
    public ResponseEntity<RegistrationRequestDTO> getOfficerByAccountNo(@PathVariable String accountNo) {
        log.info("Fetching officer details for account number: {}", accountNo);

        RegistrationRequestDTO officer = userReLoginService.getOfficerByAccountNo(accountNo);

        if (officer == null) {
            log.warn("No officer found for account number: {}", accountNo);
            return ResponseEntity.notFound().build();
        }

        log.info("Officer details retrieved for account number: {}", accountNo);
        return ResponseEntity.ok(officer);
    }


       
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Users user) {
        
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Username cannot be null or empty");
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email cannot be null or empty");
        }
          
        user.setId(id);
          
       userReLoginService.updateUser(user);
    
        return ResponseEntity.ok("User updated successfully");
    }
    

    @PostMapping("/send")
    public String sendOtp(@RequestParam String mobileNumber) {
        try {
            return userReLoginService.sendOtp(mobileNumber);
        } catch (Exception e) {
            return "Error sending OTP: " + e.getMessage();
        }
    }
    
}
