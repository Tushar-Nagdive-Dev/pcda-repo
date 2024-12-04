package com.inn.pcda.pcdamanages.controller;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.services.IGalleryService;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/gallery") // Corrected the base URL
public class GalleryController {

    @Autowired
    private IGalleryService iGalleryService;

    @PostMapping
    public ResponseEntity<Gallery> addGallery(@RequestBody GalleryDTO galleryDTO) {
        log.info("Inside @class GalleryController @method addGallery");
        if (galleryDTO == null) {
            log.warn("GalleryDTO is null");
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }

        try {
            Gallery savedGallery = iGalleryService.addGallery(galleryDTO);
            return ResponseEntity.ok(savedGallery); // 200 OK with the saved entity
        } catch (Exception e) {
            log.error("Error while adding gallery", e);
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        log.info("Inside @class GalleryController @method getAllGallery");
        try {
            List<Gallery> galleries = iGalleryService.getAllGalleries();
            if (galleries == null || galleries.isEmpty()) {
                log.info("No galleries found");
                return ResponseEntity.noContent().build(); // 204 No Content
            }
            return ResponseEntity.ok(galleries); // 200 OK with the list of galleries
        } catch (Exception e) {
            log.error("Error while fetching all galleries", e);
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateGalleryById(@RequestBody GalleryDTO galleryDTO, @PathVariable("id") Long id) {
        log.info("Inside @class GalleryController @method updateGalleryById : id {}", id);

        if (galleryDTO == null) {
            log.warn("GalleryDTO is null for update operation");
            return ResponseEntity.badRequest().build(); // 400 Bad Request
        }

        try {
            boolean isUpdated = iGalleryService.updateGalleryById(galleryDTO, id);
            if (!isUpdated) {
                log.warn("Gallery with id {} not found for update", id);
                return ResponseEntity.notFound().build(); // 404 Not Found
            }
            return ResponseEntity.ok(true); // 200 OK with success status
        } catch (Exception e) {
            log.error("Error while updating gallery with id {}", id, e);
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteGalleryById(@PathVariable("id") Long id) {
        log.info("Inside @class GalleryController @method deleteGalleryById : id {}", id);

        try {
            boolean isDeleted = iGalleryService.deleteGalleryById(id);
            if (!isDeleted) {
                log.warn("Gallery with id {} not found for deletion", id);
                return ResponseEntity.notFound().build(); // 404 Not Found
            }
            return ResponseEntity.ok(true); // 200 OK with success status
        } catch (Exception e) {
            log.error("Error while deleting gallery with id {}", id, e);
            return ResponseEntity.internalServerError().build(); // 500 Internal Server Error
        }
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<List<Integer>> uploadGalleryFiles(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) {
        List<Integer> fileIds = iGalleryService.uploadFiles(id, files);
        if (fileIds != null) {
            return ResponseEntity.ok(fileIds);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
    }
}
