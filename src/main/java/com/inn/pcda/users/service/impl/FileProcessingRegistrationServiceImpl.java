package com.inn.pcda.users.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inn.pcda.exceptions.FileProcessingException;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.dto.TableResponseDTO;
import com.inn.pcda.users.entity.Roles;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.RoleRepository;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.IFileProcessingRegistrationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FileProcessingRegistrationServiceImpl implements IFileProcessingRegistrationService {

    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FileProcessingRegistrationServiceImpl(ObjectMapper objectMapper, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String processFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new FileProcessingException("Uploaded file is empty or null.");
        }

        List<RegistrationRequestDTO> registrationRequestDTOs = parseFile(file);

        for (RegistrationRequestDTO dto : registrationRequestDTOs) {
            processUser(dto);
        }

        log.info("File processing completed for {} records.", registrationRequestDTOs.size());
        return "File successfully processed and data saved to User table!";
    }

    private List<RegistrationRequestDTO> parseFile(MultipartFile file) throws IOException {
        try {
            return objectMapper.readValue(file.getInputStream(), new TypeReference<List<RegistrationRequestDTO>>() {});
        } catch (IOException e) {
            log.error("Error occurred while parsing the uploaded file: {}", file.getOriginalFilename(), e);
            throw new FileProcessingException("Failed to parse the uploaded file.", e);
        }
    }

    private void processUser(RegistrationRequestDTO dto) {
        Users user = mapToUserEntity(dto);

        // Ensure required fields like office_code are populated
        if (user.getOfficeCode() == null || user.getOfficeCode().isEmpty()) {
            user.setOfficeCode("DEFAULT_CODE"); // Set a default value
        }

        userRepository.save(user);
        log.info("User successfully saved: {}", user.getUsername());
    }

    private Users mapToUserEntity(RegistrationRequestDTO dto) {
        Users user = new Users();

        // Generate random username and password if not provided
        String randomUsername = generateRandomString();
        String randomPassword = generateRandomString();

        user.setUsername(dto.getUsername() != null ? dto.getUsername() : randomUsername);
        user.setPassword(dto.getPassword() != null ? passwordEncoder.encode(dto.getPassword()) : passwordEncoder.encode(randomPassword));
        user.setOldPassword(randomPassword);
        user.setOfficeCode("OFFCODE"); // Set default office code

        log.info("Generated credentials for user - Username: {}, Password: [encrypted]", randomUsername);

        setNameFields(dto.getOfficer_Name(), user);
        user.setEmail(dto.getEmail());
        user.setTaskNo(dto.getTask_no());
        user.setAccountNo(dto.getAccountno());
        user.setRole(getDefaultRole());

        return user;
    }

    private void setNameFields(String fullName, Users user) {
        if (fullName != null && !fullName.trim().isEmpty()) {
            String[] nameParts = fullName.trim().split("\\s+");
            user.setFirstName(nameParts[0]);
            user.setMiddleName(nameParts.length > 2 ? nameParts[1] : null);
            user.setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : null);
        } else {
            user.setFirstName("Unknown");
            user.setMiddleName(null);
            user.setLastName("User");
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
        List<Users> users = userRepository.findAll();
        return users.stream().map(this::mapToResponseDto).collect(Collectors.toList());
    }

    private ResponseRegistrationDTO mapToResponseDto(Users user) {
        ResponseRegistrationDTO dto = new ResponseRegistrationDTO();
        dto.setUsername(user.getUsername());
        dto.setTask_no(user.getTaskNo());
        dto.setAccountno(user.getAccountNo());
        dto.setOfficer_Name(formatFullName(user.getFirstName(), user.getMiddleName(), user.getLastName()));
        return dto;
    }

    private String formatFullName(String firstName, String middleName, String lastName) {
        return String.join(" ", firstName != null ? firstName : "", middleName != null ? middleName : "", lastName != null ? lastName : "").trim();
    }

    @Override
    public List<TableResponseDTO> getOfficerList() {
        return userRepository.findAll().stream()
                .map(this::mapToTableResponseDto)
                .collect(Collectors.toList());
    }

    private TableResponseDTO mapToTableResponseDto(Users user) {
        return new TableResponseDTO(
                user.getId(),
                user.getFirstName() + " " + (user.getLastName() != null ? user.getLastName() : ""),
                user.getUsername(),
                user.getEmail(),
                user.getAccountNo(),
                user.getTaskNo()
        );
    }
}
