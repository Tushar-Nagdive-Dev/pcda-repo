package com.inn.pcda.pcdamanages.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.services.GalleryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/gallery")
@Slf4j
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @PostMapping("/upload")
    public ResponseEntity<?> saveGalleryWithFiles(
            @RequestPart("gallery") Gallery gallery,
            @RequestPart("files") MultipartFile[] files) {
        try {
            Gallery savedGallery = galleryService.saveGalleryWithFiles(gallery, files);
            return ResponseEntity.ok(savedGallery);
        } catch (Exception e) {
            log.error("Error saving gallery", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving gallery: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGalleryById(@PathVariable Long id) {
        Gallery gallery = galleryService.getGalleryById(id);
        if (gallery == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(gallery);
    }

    @GetMapping("/{id}/files")
    public ResponseEntity<?> getFilesForGallery(@PathVariable Long id) {
        try {
            List<String> filePaths = galleryService.getFilePaths(id);
            return ResponseEntity.ok(filePaths);
        } catch (Exception e) {
            log.error("Error fetching files for gallery", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching files: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateGallery(@PathVariable Long id, @RequestBody Gallery updatedGallery) {
        boolean updated = galleryService.updateGallery(id, updatedGallery);
        return updated ? ResponseEntity.ok("Gallery updated successfully.")
                : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGallery(@PathVariable Long id) {
        boolean deleted = galleryService.deleteGallery(id);
        return deleted ? ResponseEntity.ok("Gallery deleted successfully.")
                : ResponseEntity.notFound().build();
    }
}
