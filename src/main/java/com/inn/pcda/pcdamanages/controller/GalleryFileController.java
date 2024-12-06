package com.inn.pcda.pcdamanages.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/gallery-files")
@Slf4j
public class GalleryFileController {

    @GetMapping("/{id}/{fileName:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String id, @PathVariable String fileName) {
        try {
            Path filePath = Paths.get("/Users/tusharnagdive/Development/vsWorkspace/Projects/pcda/gallery-files/" + id + "/" + fileName);
            log.debug("Attempting to serve file from path: {}", filePath);

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                log.debug("File found: {}", filePath);
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                log.error("File not found or not readable: {}", filePath);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            log.error("Error serving file", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
