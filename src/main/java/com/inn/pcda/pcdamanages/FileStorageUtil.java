package com.inn.pcda.pcdamanages;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class FileStorageUtil {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageUtil.class);

    /**
     * Create a folder if it does not exist.
     *
     * @param folderPath The path to the folder to be created.
     */
    public void createFolder(String folderPath) {
        try {
            Path path = Paths.get(folderPath);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
                logger.info("Folder created: {}", folderPath);
            } else {
                logger.info("Folder already exists: {}", folderPath);
            }
        } catch (IOException e) {
            logger.error("Failed to create folder: {}", folderPath, e);
            throw new RuntimeException("Failed to create folder: " + folderPath, e);
        }
    }

    /**
     * Store multiple files in a specified folder.
     *
     * @param folderPath The folder to store files in.
     * @param files      The files to be stored.
     * @return A list of stored file names.
     */
    public List<String> storeFilesInFolder(String folderPath, MultipartFile[] files) {
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile file : files) {
            try {
                String sanitizedFileName = sanitizeFileName(file.getOriginalFilename());
                Path filePath = Paths.get(folderPath, sanitizedFileName);

                // Check if the file already exists and handle duplicates
                filePath = resolveDuplicateFileName(filePath);

                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                fileNames.add(filePath.getFileName().toString());
                logger.info("File stored: {}", filePath);
            } catch (IOException e) {
                logger.error("Failed to store file: {}", file.getOriginalFilename(), e);
                throw new RuntimeException("Failed to store file: " + file.getOriginalFilename(), e);
            }
        }
        return fileNames;
    }

    /**
     * Get a list of all files in a specified folder.
     *
     * @param folderPath The folder to retrieve files from.
     * @return A list of file names in the folder.
     */
    public List<String> getFilesInFolder(String folderPath) {
        try {
            return Files.list(Paths.get(folderPath))
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString) // Only file names
                    .collect(Collectors.toList());
        } catch (IOException e) {
            logger.error("Failed to list files in folder: {}", folderPath, e);
            throw new RuntimeException("Failed to list files in folder: " + folderPath, e);
        }
    }
    

    /**
     * Delete a folder and its contents.
     *
     * @param folderPath The folder to be deleted.
     */
    public void deleteFolder(String folderPath) {
        try {
            Files.walk(Paths.get(folderPath))
                    .sorted(Comparator.reverseOrder())
                    .map(Path::toFile)
                    .forEach(File::delete);
            logger.info("Folder deleted: {}", folderPath);
        } catch (IOException e) {
            logger.error("Failed to delete folder: {}", folderPath, e);
            throw new RuntimeException("Failed to delete folder: " + folderPath, e);
        }
    }

    /**
     * Sanitize a file name to remove spaces and special characters.
     *
     * @param fileName The original file name.
     * @return A sanitized file name.
     */
    private String sanitizeFileName(String fileName) {
        if (fileName == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }
        return fileName.replaceAll("[^a-zA-Z0-9._-]", "_").replaceAll("\\s+", "_");
    }

    /**
     * Resolve duplicate file names by appending a unique suffix.
     *
     * @param filePath The original file path.
     * @return A unique file path.
     */
    private Path resolveDuplicateFileName(Path filePath) {
        int count = 0;
        Path uniquePath = filePath;

        String baseName = getBaseName(filePath.getFileName().toString());
        String extension = getExtension(filePath.getFileName().toString());

        while (Files.exists(uniquePath)) {
            count++;
            uniquePath = filePath.getParent().resolve(baseName + "_" + count + "." + extension);
        }

        return uniquePath;
    }

    /**
     * Extract the base name of a file (name without extension).
     */
    private String getBaseName(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? fileName : fileName.substring(0, dotIndex);
    }

    /**
     * Extract the extension of a file.
     */
    private String getExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf('.');
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex + 1);
    }
}
