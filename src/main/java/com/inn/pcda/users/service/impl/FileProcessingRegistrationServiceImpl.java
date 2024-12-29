package com.inn.pcda.users.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inn.pcda.exceptions.FileProcessingException;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.dto.ResetPasswordResponseDTO;
import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.dto.TableResponseDTO;
import com.inn.pcda.users.entity.Roles;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.RoleRepository;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.IFileProcessingRegistrationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileProcessingRegistrationServiceImpl implements IFileProcessingRegistrationService {

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String processFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new FileProcessingException("Uploaded file is empty or null.");
        }

        List<RegistrationRequestDTO> registrationRequestDTOs = parseFile(file);

        registrationRequestDTOs.forEach(this::processUser);

        log.info("File processing completed for {} records.", registrationRequestDTOs.size());
        return "File successfully processed and data saved to User table!";
    }

    private List<RegistrationRequestDTO> parseFile(MultipartFile file) throws IOException {
        try {
            return objectMapper.readValue(file.getInputStream(), new TypeReference<>() {});
        } catch (IOException e) {
            log.error("Error parsing uploaded file: {}", file.getOriginalFilename(), e);
            throw new FileProcessingException("Failed to parse the uploaded file.", e);
        }
    }

    private void processUser(RegistrationRequestDTO dto) {
        Users user = mapToUserEntity(dto);

        if (user.getOfficeCode() == null || user.getOfficeCode().isEmpty()) {
            user.setOfficeCode("DEFAULT_CODE");
        }

        userRepository.save(user);
        log.info("User saved successfully: {}", user.getUsername());
    }

    private Users mapToUserEntity(RegistrationRequestDTO dto) {
        String username = generateRandomString();
        String password = generateRandomString();
        Users user = new Users();
        user.setUsername(dto.getUsername() != null ? dto.getUsername() : username);
        user.setPassword(passwordEncoder.encode(dto.getPassword() != null ? dto.getPassword() : password));
        user.setOldPassword(password);
        user.setEmail(dto.getEmail());
        user.setAccountNo(dto.getAccountno());
        user.setTaskNo(dto.getTask_no());
        user.setOfficeCode("DEFAULT_CODE");
        user.setFirstName(getNamePart(dto.getOfficer_name(), "first"));
        user.setMiddleName(getNamePart(dto.getOfficer_name(), "middle"));
        user.setLastName(getNamePart(dto.getOfficer_name(), "last"));
        user.setRole(getDefaultRole());
        return user;
    }

    private String getNamePart(String fullName, String part) {
        if (fullName == null || fullName.trim().isEmpty()) {
            return part.equals("first") ? "Unknown" : null;
        }
    
        String[] parts = fullName.trim().split("\\s+");
        
        switch (part) {
            case "first":
                return parts[0]; // Always the first part
            case "last":
                return parts[parts.length - 1]; // Always the last part
            case "middle":
                if (parts.length > 2) {
                    // Join the middle parts into a single string
                    return String.join(" ", Arrays.copyOfRange(parts, 1, parts.length - 1));
                } else {
                    return ""; // No middle name
                }
            default:
                return null; // Invalid part request
        }
    }

    private Roles getDefaultRole() {
        return roleRepository.findById(1L)
                .orElseThrow(() -> new FileProcessingException("Default role not found with ID: 1"));
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    @Override
    public List<ResponseRegistrationDTO> downloadAllDataAsJson() {
        return userRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    private ResponseRegistrationDTO mapToResponseDto(Users user) {
        return new ResponseRegistrationDTO(
                formatFullName(user.getFirstName(), user.getMiddleName(), user.getLastName()),
                user.getUsername(),
                user.getOldPassword(),
                user.getEmail(),
                user.getAccountNo(),
                user.getTaskNo()
        );
    }

    private String formatFullName(String firstName, String middleName, String lastName) {
        return String.join(" ", firstName != null ? firstName : "", middleName != null ? middleName : "", lastName != null ? lastName : "").trim();
    }

    @Override
    public List<TableResponseDTO> getOfficerList() {
        return userRepository.findAll().stream().map(this::mapToTableResponseDto).collect(Collectors.toList());
    }

    private TableResponseDTO mapToTableResponseDto(Users user) {
        return new TableResponseDTO(
                user.getId(),
                formatFullName(user.getFirstName(), user.getMiddleName(), user.getLastName()),
                user.getUsername(),
                user.getEmail(),
                user.getAccountNo(),
                user.getTaskNo()
        );
    }

    @Override
    public ResetPasswordResponseDTO getUserById(Long id) {
        Users user = userRepository.findById(id).orElseThrow(() -> new FileProcessingException("User not found"));
        return new ResetPasswordResponseDTO(user.getId(), formatFullName(user.getFirstName(), user.getMiddleName(), user.getLastName()), user.getAccountNo(), user.getOldPassword());
    }

    @Override
    public void updatePassword(Long id, String newPassword) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new FileProcessingException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setOldPassword(newPassword); // Optional: store the current password as old
        userRepository.save(user);
        log.info("Password updated successfully for user: {}", user.getUsername());
    }

}
