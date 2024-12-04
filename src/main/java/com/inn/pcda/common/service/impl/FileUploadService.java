package com.inn.pcda.common.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.common.service.IFileUploadService;

public class FileUploadService implements IFileUploadService  {

    private static final String UPLOAD_DIR = "uploads/";

    @Override
    public Integer saveFile(MultipartFile file) throws IOException {
        // Ensure the directory exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique name for the file
        String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        // Save the file locally
        Path filePath = uploadPath.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), filePath);

        // Return a generated image ID (For simplicity, use the file name hash code)
        return uniqueFileName.hashCode();
    }
    
}
