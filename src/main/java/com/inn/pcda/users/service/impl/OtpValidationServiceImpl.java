package com.inn.pcda.users.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.inn.pcda.common.service.IEmailService;
import com.inn.pcda.common.service.ISMSService;
import com.inn.pcda.users.entity.OtpValidation;
import com.inn.pcda.users.repository.OtpValidationRepository;
import com.inn.pcda.users.service.IOtpValidationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class OtpValidationServiceImpl implements IOtpValidationService{
    
    private final OtpValidationRepository otpValidationRepository;

    private final IEmailService iEmailService;

    private final ISMSService iSMSService;

    @Value("${otp.expiry.minutes:10}")
    private Integer otpExpiryMinutes;

    /**
     * Generate OTP for email or phone.
     *
     * @param email       Email address
     * @param phoneNumber Phone number
     * @return Message indicating the OTP has been sent
     */
    public String generateOtp(String email, String phoneNumber) {
        String otp = generateRandomOtp();
    
        // Check and handle old entries for the same email/phone
        if (email != null) {
            otpValidationRepository.findByEmailAndOtp(email, otp).ifPresent(validation -> {
                // Mark old OTP as expired
                validation.setOtpExpiresAt(LocalDateTime.now());
                otpValidationRepository.save(validation);
            });
        }
    
        if (phoneNumber != null) {
            otpValidationRepository.findByPhoneNumberAndOtp(phoneNumber, otp).ifPresent(validation -> {
                // Mark old OTP as expired
                validation.setOtpExpiresAt(LocalDateTime.now());
                otpValidationRepository.save(validation);
            });
        }
    
        // Create a new OTP entry
        OtpValidation otpValidation = new OtpValidation();
        otpValidation.setEmail(email);
        otpValidation.setPhoneNumber(phoneNumber);
        otpValidation.setOtp(otp);
        otpValidation.setOtpGeneratedAt(LocalDateTime.now());
        otpValidation.setOtpExpiresAt(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otpValidation.setVerified(false);
    
        if (email != null) {
            iEmailService.sendOtp(email, otp);
            log.info("OTP sent to email: {}", email);
        }
        if (phoneNumber != null) {
            iSMSService.sendOtp(phoneNumber, otp);
            log.info("OTP sent to phone: {}", phoneNumber);
        }

        otpValidationRepository.save(otpValidation);
        return "OTP sent successfully.";
    }

    /**
     * Verify OTP for email or phone.
     *
     * @param email       Email address
     * @param phoneNumber Phone number
     * @param otp         OTP to validate
     * @return true if OTP is valid and verified
     */
    public boolean verifyOtp(String email, String phoneNumber, String otp) {
        Optional<OtpValidation> otpValidation;
        if (email != null) {
            otpValidation = otpValidationRepository.findByEmailAndOtp(email, otp);
        } else {
            otpValidation = otpValidationRepository.findByPhoneNumberAndOtp(phoneNumber, otp);
        }

        if (otpValidation.isPresent()) {
            OtpValidation validation = otpValidation.get();
            if (validation.getOtpExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("OTP has expired.");
            }
            if (validation.isVerified()) {
                throw new RuntimeException("OTP is already verified.");
            }

            validation.setVerified(true);
            otpValidationRepository.save(validation);
            return true;
        }
        return false;
    }

    private String generateRandomOtp() {
        String otp;
        do {
            otp = String.format("%06d", new Random().nextInt(999999));
        } while (otpValidationRepository.existsByOtp(otp));
        return otp;
    }    

    /**
     * Scheduled task to remove expired or verified OTP entries.
     * Runs every hour.
     */
    @Scheduled(fixedRate = 3600000) // Every 1 hour
    public void cleanUpExpiredOtps() {
        otpValidationRepository.deleteAllByOtpExpiresAtBeforeOrVerified(LocalDateTime.now(), true);
        log.info("Expired and verified OTP entries have been cleaned up.");
    }
}
