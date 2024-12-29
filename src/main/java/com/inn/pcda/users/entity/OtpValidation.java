package com.inn.pcda.users.entity;

import java.time.LocalDateTime;

import com.inn.pcda.configs.baseimplementation.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "otp_validation")
public class OtpValidation extends BaseEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String email; // Email for OTP validation

    @Column(nullable = true)
    private String phoneNumber; // Phone for OTP validation

    @Column(nullable = false, length = 6)
    private String otp; // Generated OTP

    @Column(nullable = false)
    private LocalDateTime otpGeneratedAt; // Timestamp when OTP was generated

    @Column(name = "expires_at",nullable = false)
    private LocalDateTime otpExpiresAt; // OTP expiry time

    @Column(nullable = false)
    private boolean verified = false; // Verification status (default to false)
}
