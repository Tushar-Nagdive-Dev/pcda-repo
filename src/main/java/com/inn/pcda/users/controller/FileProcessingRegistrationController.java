package com.inn.pcda.users.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inn.pcda.users.dto.ResetPasswordResponseDTO;
import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.dto.TableResponseDTO;
import com.inn.pcda.users.service.IFileProcessingRegistrationService;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/registration-processing")
public class FileProcessingRegistrationController {

    private final IFileProcessingRegistrationService fileProcessingService;

    @Operation(summary = "Upload a registration file", 
               description = "This endpoint allows uploading a registration file for processing. The file must be provided as a `multipart/form-data` request with the parameter name `file`.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "File processed successfully"),
        @ApiResponse(responseCode = "400", description = "Unexpected error during processing"),
        @ApiResponse(responseCode = "500", description = "Error processing the file")
    })
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String result = fileProcessingService.processFile(file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            log.error("Error processing file: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    @Operation(summary = "Download all registration data as JSON", 
               description = "This endpoint allows downloading all processed registration data in JSON format. The file will be downloaded as `registration_data.json`.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "File downloaded successfully"),
        @ApiResponse(responseCode = "500", description = "Error during file download")
    })
    @GetMapping("/download")
    public void downloadAllData(HttpServletResponse response) {
        log.info("Starting file download process...");
        try {
            List<ResponseRegistrationDTO> data = fileProcessingService.downloadAllDataAsJson();

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonData = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);

            response.setContentType("application/json");
            response.setHeader("Content-Disposition", "attachment; filename=registration_data.json");

            try (ServletOutputStream outputStream = response.getOutputStream()) {
                outputStream.write(jsonData.getBytes());
                outputStream.flush();
            }

            log.info("File download completed successfully.");
        } catch (IOException e) {
            log.error("Error during file download process: ", e);
            throw new RuntimeException("Failed to download JSON file", e);
        }
    }

    @Operation(summary = "Get a list of officers", 
               description = "Retrieves a list of officers with their details in a tabular format.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Officer list retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "Error fetching officer list")
    })
    @GetMapping("/users")
    public ResponseEntity<List<TableResponseDTO>> getOfficerList() {
        try {
            return ResponseEntity.ok(fileProcessingService.getOfficerList());
        } catch (Exception e) {
            log.error("Error fetching officer list: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Get user details by ID", 
               description = "Retrieves user details by their unique ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User details retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{id}")
    public ResponseEntity<ResetPasswordResponseDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(fileProcessingService.getUserById(id));
    }

    @Operation(summary = "Reset user password", 
               description = "Allows resetting the password for a user by their ID. The new password should be passed as a query parameter.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password reset successfully"),
        @ApiResponse(responseCode = "500", description = "Error resetting password")
    })
    @PutMapping("/reset-password/{id}")
    public ResponseEntity<String> resetPassword(@PathVariable Long id, @RequestParam("password") String newPassword) {
        try {
            fileProcessingService.updatePassword(id, newPassword);
            return ResponseEntity.ok("Password reset successfully!");
        } catch (Exception e) {
            log.error("Error resetting password: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error resetting password: " + e.getMessage());
        }
    }
}
