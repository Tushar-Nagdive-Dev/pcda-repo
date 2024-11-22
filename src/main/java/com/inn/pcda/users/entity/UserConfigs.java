package com.inn.pcda.users.entity;

import java.time.LocalDateTime;

import com.inn.pcda.configs.baseImplementation.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter @Getter @NoArgsConstructor @ToString
@Entity
@Table(name = "user_config")
public class UserConfigs extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user; // Reference to the User entity

    @Column
    private String question; // Security question

    @Column
    private String answer; // Security answer

    @Column(name = "password_counter")
    private Integer passwordCounter = 0;

    @Column(name = "last_forget_date")
    private LocalDateTime lastForgetDate;

    @Column(name = "last_password_date")
    private LocalDateTime lastPasswordDate;

    @Column(name = "password_reset_status")
    private Character passwordResetStatus = 'N';

    @Column(name = "term_and_condition")
    private Character termAndCondition = 'N';

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @Column(name = "email_otp")
    private String emailOtp;

    @Column(name = "mobile_otp")
    private String mobileOtp;

    @Column(name = "email_otp_created")
    private LocalDateTime emailOtpCreated;

    @Column(name = "mobile_otp_created")
    private LocalDateTime mobileOtpCreated;

    @Column(name = "email_verified_count")
    private Integer emailVerifiedCount = 0;

    @Column(name = "mobile_verified_count")
    private Integer mobileVerifiedCount = 0;

    @Column(name = "email_verified_at")
    private LocalDateTime emailVerifiedAt;

    @Column(name = "mobile_verified_at")
    private LocalDateTime mobileVerifiedAt;

    @Column(name = "auth_data", columnDefinition = "TEXT")
    private String authData;

    @Column
    private String otp;

    @Column(name = "otp_created_at")
    private LocalDateTime otpCreatedAt;

    @Column(name = "forgot_otp")
    private String forgotOtp;

    @Column(name = "forgot_otp_created")
    private LocalDateTime forgotOtpCreated;

    @Column(name = "auth_data_old", columnDefinition = "TEXT")
    private String authDataOld;

    @Column(name = "reset_otp")
    private String resetOtp;

    @Column(name = "reset_otp_created")
    private LocalDateTime resetOtpCreated;
}
