package com.inn.pcda.common.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.common.service.IFileStorageService;
import com.inn.pcda.exceptions.FileStorageException;

@Service
public class FileStorageService implements IFileStorageService {

    private static final String UPLOAD_DIR = "uploads/";

    @Override
    public List<Integer> storeFiles(MultipartFile[] files) {
        List<Integer> fileIds = new ArrayList<>();
        try {
            // Ensure the directory exists
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    // Generate a unique name for the file
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

                    // Save the file to the server
                    Path filePath = uploadPath.resolve(fileName);
                    Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                    // Use the file name's hash as the file ID for simplicity
                    fileIds.add(fileName.hashCode());
                }
            }
        } catch (IOException e) {
            throw new FileStorageException("Failed to store files", e);
        }
        return fileIds;
    }
}
