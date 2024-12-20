package com.inn.pcda.pcdamanages.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.GalleryDTOdir.GallerShowDto;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.enums.GalleryTypes;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/gallery")
@Slf4j
public class GalleryController {

    private final IGalleryService galleryService;

    @Autowired
    public GalleryController(IGalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @Operation(summary = "Upload a gallery with files", description = "Uploads a gallery along with its associated files.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Gallery uploaded successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Gallery.class))),
        @ApiResponse(responseCode = "500", description = "Error saving gallery", content = @Content)
    })
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

    @Operation(summary = "Get all galleries", description = "Retrieves a list of all galleries.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Galleries retrieved successfully", content = @Content(mediaType = "application/json"))
    })
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        List<Gallery> galleries = galleryService.getAllGalleries();
        return ResponseEntity.ok(galleries);
    }

    @Operation(summary = "Get a gallery by ID", description = "Retrieves a gallery using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Gallery retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Gallery.class))),
        @ApiResponse(responseCode = "404", description = "Gallery not found", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable Long id) {
        Gallery gallery = galleryService.getGalleryById(id);
        return gallery != null ? ResponseEntity.ok(gallery) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Get file paths for a gallery", description = "Retrieves the file paths for a specific gallery.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "File paths retrieved successfully", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "500", description = "Error fetching files", content = @Content)
    })
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

    @Operation(summary = "Delete a gallery by ID", description = "Deletes a gallery using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Gallery deleted successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "Gallery not found", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGallery(@PathVariable Long id) {
        boolean deleted = galleryService.deleteGallery(id);
        return deleted ? ResponseEntity.ok("Gallery deleted successfully.")
                       : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Get galleries for view", description = "Retrieves a list of galleries formatted for viewing.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Galleries retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = GallerShowDto.class)))
    })
    @GetMapping("/forView")
    public ResponseEntity<List<GallerShowDto>> getAllGalleriesForView() {
        List<GallerShowDto> galleries = galleryService.getAllGalleriesForView();
        return ResponseEntity.ok(galleries);
    }

    @Operation(summary = "Update a gallery with files", description = "Updates an existing gallery along with its associated files.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Gallery updated successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "Gallery not found", content = @Content),
        @ApiResponse(responseCode = "500", description = "Error updating gallery", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<String> updateGallery(
            @PathVariable Long id,
            @RequestPart("gallery") Gallery gallery,
            @RequestPart(value = "files", required = false) MultipartFile[] files) {
        try {
            if (gallery.getType() == null) {
                gallery.setType(GalleryTypes.IMAGE); // Assign default type if null
            }
            galleryService.updateGalleryWithFiles(id, gallery, files);
            return ResponseEntity.ok("Gallery updated successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Gallery not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating gallery: " + e.getMessage());
        }
    }
}
