package com.inn.pcda.users.service.impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.inn.pcda.configs.baseimplementation.AESUtil;
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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserConfigRepository userConfigRepository;
    private final AESUtil aesUtil;

    @Override
    public OfficerDetailsDTO getOfficerByAccountNo(String accountNo) {
        return userRepository.findByAccountNo(accountNo).map(this::mapToDTO).orElse(null);
    }

    @Transactional
    @Override
    public Users updateUser(OfficerDetailsDTO officerDetailsDTO) {
        Users user = userRepository.findById(officerDetailsDTO.userId()).orElseThrow(() -> new RuntimeException("Officer not found"));

        updateUserDetails(user, officerDetailsDTO);
        userRepository.save(user);

        UserConfigs userConfig = Optional.ofNullable(userConfigRepository.findByUser(user)).orElseGet(() -> initializeNewUserConfig(user));
        updateUserConfig(userConfig, officerDetailsDTO);

        userConfigRepository.save(userConfig);
        return user;
    }

    private OfficerDetailsDTO mapToDTO(Users user) throws RuntimeException{
        try {
            return new OfficerDetailsDTO(
                    formatFullName(user.getFirstName(), user.getMiddleName(), user.getLastName()),
                    user.getAccountNo(),
                    user.getUsername(),
                    aesUtil.decrypt(user.getOldPassword()),
                    "",
                    "",
                    "",
                    user.getId()
            );
        } catch (Exception e) {
            log.error("Error Occured inside @class UserReLoginServiceImpl @method", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    private String formatFullName(String firstName, String middleName, String lastName) {
        return String.join(" ", 
                Optional.ofNullable(firstName).orElse(""),
                Optional.ofNullable(middleName).orElse(""),
                Optional.ofNullable(lastName).orElse("")
        ).trim();
    }

    private void updateUserDetails(Users user, OfficerDetailsDTO dto) {
        try {
            user.setUsername(dto.username());
            user.setPassword(passwordEncoder.encode(dto.password()));
            user.setOldPassword(aesUtil.encrypt(dto.password()));
            String[] nameParts = parseFullName(dto.officerName());
            user.setFirstName(nameParts[0]);
            user.setMiddleName(nameParts[1]);
            user.setLastName(nameParts[2]);
        } catch (Exception e) {
            log.error("Error updating user details", e);
            throw new RuntimeException("Failed to update user details: " + e.getMessage());
        }
    }

    private UserConfigs initializeNewUserConfig(Users user) {
        UserConfigs userConfig = new UserConfigs();
        userConfig.setUser(user);
        return userConfig;
    }

    private void updateUserConfig(UserConfigs userConfig, OfficerDetailsDTO dto) {
        try {
            userConfig.setQuestion(dto.securityQuestion());
            userConfig.setAnswer(aesUtil.encrypt(dto.securityAnswer()));
            userConfig.setPasswordCounter(0);
            userConfig.setPasswordResetStatus('N');
            userConfig.setTermAndCondition('Y');
        } catch (Exception e) {
            log.error("Error updating user config", e);
            throw new RuntimeException("Failed to update user config: " + e.getMessage());
        }
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private String sendSms(String apiUrl) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
        conn.setRequestMethod("GET");

        int responseCode = conn.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            return "Failed to send OTP. HTTP error code: " + responseCode;
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            reader.lines().forEach(response::append);
            return "OTP sent successfully: " + response;
        }
    }

    private String[] parseFullName(String fullName) {
        String[] parts = Optional.ofNullable(fullName).orElse("").trim().split("\\s+");
        return new String[]{
                parts.length > 0 ? parts[0] : "Unknown",
                parts.length > 2 ? String.join(" ", Arrays.copyOfRange(parts, 1, parts.length - 1)) : "",
                parts.length > 1 ? parts[parts.length - 1] : ""
        };
    }
}
