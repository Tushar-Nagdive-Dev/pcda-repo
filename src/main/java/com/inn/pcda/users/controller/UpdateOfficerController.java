package com.inn.pcda.users.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.common.service.IEmailService;
import com.inn.pcda.common.service.ISMSService;
import com.inn.pcda.users.dto.OfficerDetailsDTO;
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
    public ResponseEntity<OfficerDetailsDTO> getOfficerByAccountNo(@PathVariable String accountNo) {
        return Optional.ofNullable(userReLoginService.getOfficerByAccountNo(accountNo))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Boolean> updateOfficer(@PathVariable Long userId, @RequestBody OfficerDetailsDTO officerDto) {
        try {
            userReLoginService.updateUser(officerDto);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            log.error("Error updating officer", e);
            return ResponseEntity.internalServerError().body(false);
        }
    }

    // @GetMapping("/sendOtp/{mobileNumber}")
    // public ResponseEntity<String> sendOtp(@PathVariable String mobileNumber) {
    //     log.info("Request to send OTP to: {}", mobileNumber);
    //     String response = iSMSService.sendOtp(mobileNumber);
    //     return ResponseEntity.ok(response);
    // }

    // @PostMapping("/sendOtp/email")
    // public ResponseEntity<String> sendOtpByEmail(@RequestParam String email) {
    //     log.info("Request to send OTP to email: {}", email);
    //     String response = iEmailService.sendOtp(email);
    //     return ResponseEntity.ok(response);
    // }
}
