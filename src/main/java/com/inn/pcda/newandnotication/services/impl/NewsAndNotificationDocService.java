package com.inn.pcda.newandnotication.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.newandnotication.services.INewsAndNotificationDocService;

@Service
public class NewsAndNotificationDocService implements INewsAndNotificationDocService{

    public final String uploadDocDir = "news/docs/uploads/";

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        if(file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDocDir, fileName);

        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());

        return filePath.toString();
    }
    
}
