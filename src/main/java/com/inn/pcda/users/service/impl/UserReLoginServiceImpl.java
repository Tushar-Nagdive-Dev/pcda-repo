package com.inn.pcda.users.service.impl;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inn.pcda.users.dto.OfficerDetailsDTO;
import com.inn.pcda.users.entity.UserConfigs;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.UserConfigRepository;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.IUserReLoginService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserReLoginServiceImpl implements IUserReLoginService {


    private final UserRepository officerRepository;
    private final PasswordEncoder passwordEncoder;  
  
    private final  UserConfigRepository userConfigRepository;



    @Value("${sms.gateway.url}")
    private String smsGatewayUrl;

    @Value("${sms.gateway.username}")
    private String username;

    @Value("${sms.gateway.pin}")
    private String pin;

    @Value("${sms.gateway.senderId}")
    private String senderId;

    @Override
    public OfficerDetailsDTO getOfficerByAccountNo(String accountNo) {
        return officerRepository.findByAccountNo(accountNo).map(this::mapToDTO).orElse(null);
    }

    private OfficerDetailsDTO mapToDTO(Users officerEntity) {
        return new OfficerDetailsDTO(
            formatFullName(officerEntity.getFirstName(), officerEntity.getMiddleName(), officerEntity.getLastName()), 
            officerEntity.getAccountNo(), 
            officerEntity.getUsername(), 
            officerEntity.getOldPassword(), 
            "", 
            "", 
            "", 
            officerEntity.getId()
        );
    }

    private String formatFullName(String firstName, String middleName, String lastName) {
        return String.join(" ", firstName != null ? firstName : "", middleName != null ? middleName : "", lastName != null ? lastName : "").trim();
    }   


    @Transactional
    @Override
    public Users updateUser(Users user) {
     
        Users existingUser = officerRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        updateUserDetails(existingUser, user);
    
        // Save updated user
        officerRepository.save(existingUser);
        UserConfigs userConfig = userConfigRepository.findByUser(existingUser);
        if (userConfig == null) {
            // If UserConfig does not exist, create a new one
            userConfig = new UserConfigs();
            userConfig.setUser(existingUser);
            initializeUserConfig(userConfig);
    
            // Save the new UserConfig
            userConfigRepository.save(userConfig);
        }else {

        }
        return existingUser;
    }

    
    
    private void updateUserDetails(Users existingUser, Users user) {
        // Update the existing user's properties with the new values
        existingUser.setOfficeCode(user.getOfficeCode());
        existingUser.setUsername(user.getUsername());
        existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        existingUser.setOldPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        existingUser.setFirstName(user.getFirstName());
        existingUser.setMiddleName(user.getMiddleName());
        existingUser.setLastName(user.getLastName());
        existingUser.setEmail(user.getEmail());
        existingUser.setAccountNo(user.getAccountNo());
        existingUser.setTaskNo(user.getTaskNo());
        existingUser.setIsOldPassword(user.getIsOldPassword());
    }
    
    private void initializeUserConfig(UserConfigs userConfig) {
        // Set default values for the new UserConfig
        userConfig.setQuestion(""); 
        userConfig.setAnswer(""); 
        userConfig.setPasswordCounter(0); 
        userConfig.setLastForgetDate(null);
        userConfig.setLastPasswordDate(null);
        userConfig.setPasswordResetStatus('N');
        userConfig.setTermAndCondition('y');
        userConfig.setLastLogin(null);
        userConfig.setEmailOtp("");
        userConfig.setMobileOtp("");
        userConfig.setEmailOtpCreated(null);
        userConfig.setMobileOtpCreated(null);
        userConfig.setEmailVerifiedCount(0);
        userConfig.setMobileVerifiedCount(0);
        userConfig.setEmailVerifiedAt(null);
        userConfig.setMobileVerifiedAt(null);
        userConfig.setAuthData("");
        userConfig.setOtp("");
        userConfig.setOtpCreatedAt(null);
        userConfig.setForgotOtp("");
        userConfig.setForgotOtpCreated(null);
        userConfig.setAuthDataOld("");
        userConfig.setResetOtp("");
        userConfig.setResetOtpCreated(null);
    }



    @Override
    public String sendOtp(String mobileNumber) {
    try {
        String otp = generateOtp();
        String message = "Your OTP is: " + otp;
        message = URLEncoder.encode(message, "UTF-8");

        // Ensure that smsGatewayUrl has the correct endpoint
        String apiUrl = smsGatewayUrl + "username=" + username + "&pin=" + pin + "&signature=" + senderId + "&mnumber=" + mobileNumber + "&message=" + message;

        // Call the sendSms method with the correct API URL
        return sendSms(apiUrl);
    } catch (Exception e) {
        e.printStackTrace();
        return "Failed to send OTP: " + e.getMessage();
    }
}


    private String generateOtp() {
        Random rand = new Random();
        int otp = rand.nextInt(999999); 
        return String.format("%06d", otp);
    }

    private String sendSms(String apiUrl) throws Exception {
        URL url = new URL(apiUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setDoOutput(true);
    
        int responseCode = conn.getResponseCode(); // Get the HTTP response code
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return "Failed to send OTP. HTTP error code: " + responseCode;
        }
    
        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            response.append(line);
        }
        rd.close();
    
        return "OTP sent successfully: " + response.toString();
    }
    
}
