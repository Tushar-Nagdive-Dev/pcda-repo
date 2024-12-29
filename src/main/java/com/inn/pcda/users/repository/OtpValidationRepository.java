package com.inn.pcda.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.OtpValidation;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpValidationRepository extends JpaRepository<OtpValidation, Long> {

    Optional<OtpValidation> findByEmailAndOtp(String email, String otp);

    Optional<OtpValidation> findByPhoneNumberAndOtp(String phoneNumber, String otp);

    Integer deleteAllByOtpExpiresAtBeforeOrVerified(LocalDateTime now, boolean isVerified);

    boolean existsByOtp(String otp);
}
