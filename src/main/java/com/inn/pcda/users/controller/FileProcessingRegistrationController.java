package com.inn.pcda.users.controller;


import com.fasterxml.jackson.databind.ObjectMapper;

import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.dto.TableResponseDTO;
import com.inn.pcda.users.service.IFileProcessingRegistrationService;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;

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
	
	@PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String result = fileProcessingService.processFile(file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping("/download")
    public void downloadAllData(HttpServletResponse response) {
        log.info("Starting file download process...");
    
        try {
            // Fetch the data from the service
            List<ResponseRegistrationDTO> data = fileProcessingService.downloadAllDataAsJson();
    
            // Serialize the data to JSON
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonData = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
    
            // Set response headers to force file download
            response.setContentType("application/json");
            response.setHeader("Content-Disposition", "attachment; filename=registration_data.json");
    
            // Write the JSON data to the response output stream
            try (ServletOutputStream outputStream = response.getOutputStream()) {
                outputStream.write(jsonData.getBytes());
                outputStream.flush(); // Ensure all data is written to the output stream
            }
    
            log.info("File download completed successfully.");
        } catch (IOException e) {
            log.error("Error during file download process: ", e);
            throw new RuntimeException("Failed to download JSON file", e);
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<TableResponseDTO>> getOfficerList() {
        return ResponseEntity.ok(fileProcessingService.getOfficerList());
    }
    
        

}
