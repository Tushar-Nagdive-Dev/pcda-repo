package com.inn.pcda.pcdamanages.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.GalleryDTOdir.GallerShowDto;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/gallery")
@Slf4j
public class GalleryController {

    @Autowired
    private IGalleryService galleryService;

    @PostMapping("/upload")
    public ResponseEntity<?> saveGalleryWithFiles(
            @RequestPart("gallery") Gallery gallery,
            @RequestPart("files") MultipartFile[] files) {
        try {
            Gallery savedGallery = galleryService.saveGalleryWithFiles(gallery, files);
            return ResponseEntity.ok(savedGallery);
        } catch (Exception e) {
            log.error("Error saving gallery", e);
            return ResponseEntity.internalServerError().body("Error saving gallery: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable Long id) {
        Gallery gallery = galleryService.getGalleryById(id);
        return gallery != null ? ResponseEntity.ok(gallery) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/files")
    public ResponseEntity<List<String>> getFilesForGallery(@PathVariable Long id) {
        try {
            List<String> filePaths = galleryService.getFilePaths(id);
            return ResponseEntity.ok(filePaths);
        } catch (Exception e) {
            log.error("Error fetching files for gallery", e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateGallery(@PathVariable Long id, @RequestBody Gallery updatedGallery) {
        boolean updated = galleryService.updateGallery(id, updatedGallery);
        return updated ? ResponseEntity.ok("Gallery updated successfully.")
                       : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGallery(@PathVariable Long id) {
        boolean deleted = galleryService.deleteGallery(id);
        return deleted ? ResponseEntity.ok("Gallery deleted successfully.")
                       : ResponseEntity.notFound().build();
    }

    @GetMapping("/forView")
    public ResponseEntity<List<GallerShowDto>> getAllGalleriesForView() {
        List<GallerShowDto> galleries = galleryService.getAllGalleriesForView();
        return ResponseEntity.ok(galleries);
    }
}
