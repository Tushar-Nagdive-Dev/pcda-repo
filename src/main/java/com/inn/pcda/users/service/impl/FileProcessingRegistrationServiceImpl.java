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

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
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
    private final Validator validator;

    @Override
    public String processFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new FileProcessingException("Uploaded file is empty or null.");
        }

        List<RegistrationRequestDTO> registrationRequestDTOs = parseFile(file);

        // Validate all records
        validateRequestData(registrationRequestDTOs);

        registrationRequestDTOs.forEach(this::processUser);

        log.info("File processing completed for {} records.", registrationRequestDTOs.size());
        return "File successfully processed and data saved to User table!";
    }

    private void validateRequestData(List<RegistrationRequestDTO> registrationRequestDTOs) {
        for (RegistrationRequestDTO dto : registrationRequestDTOs) {
            Set<ConstraintViolation<RegistrationRequestDTO>> violations = validator.validate(dto);

            if (!violations.isEmpty()) {
                StringBuilder errorMessages = new StringBuilder();
                for (ConstraintViolation<RegistrationRequestDTO> violation : violations) {
                    errorMessages.append(violation.getPropertyPath())
                                .append(" - ")
                                .append(violation.getMessage())
                                .append("; ");
                }
                throw new FileProcessingException("Validation failed: " + errorMessages.toString());
            }
        }
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
        return roleRepository.findById(2L)
                .orElseThrow(() -> new FileProcessingException("Default role not found with ID: 2"));
    }

    private String generateRandomString() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    @Override
    public List<ResponseRegistrationDTO> downloadAllDataAsJson() {
        return userRepository.findAll().stream().map(this::mapToResponseDto).collect(Collectors.toList());
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

    /**
     * Prepares and writes JSON data to the HTTP response for a given date range.
     *
     * @param startDate the start date in ISO-8601 format
     * @param endDate   the end date in ISO-8601 format
     * @param response  the HTTP servlet response
     */
    @Override
    public void prepareAndWriteJsonResponse(String startDate, String endDate, HttpServletResponse response) throws IOException {
        log.info("Processing request to fetch data from {} to {}", startDate, endDate);

        // Parse and validate date range
        LocalDateTime startDateTime;
        LocalDateTime endDateTime;
        try {
            startDateTime = LocalDateTime.parse(startDate);
            endDateTime = LocalDateTime.parse(endDate);
        } catch (DateTimeParseException e) {
            log.error("Invalid date format: StartDate={}, EndDate={}", startDate, endDate, e);
            throw new IllegalArgumentException("Invalid date format. Use ISO-8601 format (yyyy-MM-dd'T'HH:mm:ss).", e);
        }

        if (startDateTime.isAfter(endDateTime)) {
            log.error("Start date {} is after end date {}", startDate, endDate);
            throw new IllegalArgumentException("Start date must be before end date.");
        }

        // Fetch data
        List<ResponseRegistrationDTO> data = fetchDataByDateRange(startDateTime, endDateTime);
        log.info("Fetched {} records for range: {} to {}", data.size(), startDate, endDate);

        // Convert data to JSON
        String jsonData = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);

        // Write JSON data to response
        writeJsonToResponse(jsonData, response);
        log.info("JSON response written successfully for range: {} to {}", startDate, endDate);
    }

    /**
     * Fetches data for a given date range.
     *
     * @param startDateTime the start date
     * @param endDateTime   the end date
     * @return list of data DTOs
     */
    private List<ResponseRegistrationDTO> fetchDataByDateRange(LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return userRepository.findAllByCreatedDateBetween(startDateTime, endDateTime)
                .stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Writes JSON data to the HTTP servlet response.
     *
     * @param jsonData the JSON data to write
     * @param response the HTTP servlet response
     * @throws IOException if an I/O error occurs
     */
    private void writeJsonToResponse(String jsonData, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setHeader("Content-Disposition", "attachment; filename=data.json");
        try (ServletOutputStream outputStream = response.getOutputStream()) {
            outputStream.write(jsonData.getBytes());
            outputStream.flush();
        }
    }

    /**
     * Maps a User entity to a ResponseRegistrationDTO.
     *
     * @param user the User entity
     * @return the mapped DTO
     */
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

    /**
     * Formats a full name from first, middle, and last names.
     *
     * @param firstName  the first name
     * @param middleName the middle name
     * @param lastName   the last name
     * @return the formatted full name
     */
    private String formatFullName(String firstName, String middleName, String lastName) {
        return String.join(" ",
                firstName != null ? firstName : "",
                middleName != null ? middleName : "",
                lastName != null ? lastName : "").trim();
    }

}
