package com.inn.pcda.pcdamanages.controller;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.services.ITestimonialService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/testimonial")
public class TestimonialController {

    @Autowired
    private ITestimonialService iTestimonialService;

    @Operation(summary = "Add a new testimonial", description = "Creates a new testimonial without an image.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Testimonial created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Testimonial.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input provided", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Testimonial> addTestimonial(
            @RequestBody(description = "Testimonial details", 
                         required = true, 
                         content = @Content(schema = @Schema(implementation = TestimonialDTO.class))) 
            TestimonialDTO testimonialDTO) {
        log.info("Inside @class TestimonialController @method addTestimonial : {}", testimonialDTO);
        Testimonial createdTestimonial = iTestimonialService.addTestimonial(testimonialDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTestimonial);
    }

    @Operation(summary = "Get all testimonials", description = "Retrieves all testimonials.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of testimonials retrieved successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = TestimonialDTO.class))),
        @ApiResponse(responseCode = "204", description = "No testimonials found", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @GetMapping
    public ResponseEntity<List<TestimonialDTO>> getAllTestimonials() {
        log.info("Inside @class TestimonialController @method getAllTestimonials");
        try {
            List<TestimonialDTO> testimonials = iTestimonialService.getAllTestimonials();
            if (testimonials.isEmpty()) {
                log.info("No testimonials found.");
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(testimonials);
        } catch (Exception e) {
            log.error("Error fetching testimonials: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Delete a testimonial by ID", description = "Deletes a testimonial using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Testimonial deleted successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "Testimonial not found", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteTestimonialById(@PathVariable("id") Long id) {
        log.info("Inside @class TestimonialController @method deleteTestimonialById for id: {}", id);
        boolean isDeleted = iTestimonialService.deleteTestimonialById(id);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            log.error("Testimonial with id: {} not found", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    @Operation(summary = "Create a testimonial with an image", description = "Creates a new testimonial with an associated image.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Testimonial created successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Testimonial.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input or file provided", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PostMapping("/create")
    public ResponseEntity<Testimonial> createTestimonialWithImage(
            @RequestPart("data") TestimonialDTO testimonialDTO,
            @RequestPart("file") MultipartFile file) {
        log.info("Inside @class TestimonialController @method createTestimonialWithImage");

        try {
            Testimonial createdTestimonial = iTestimonialService.createTestimonialWithImage(testimonialDTO, file);
            if (createdTestimonial != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdTestimonial);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        } catch (Exception e) {
            log.error("Error creating testimonial with image: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Operation(summary = "Update a testimonial with an image", description = "Updates an existing testimonial and optionally uploads a new image.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Testimonial updated successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = Testimonial.class))),
        @ApiResponse(responseCode = "404", description = "Testimonial not found", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @PutMapping("/update/{id}")
    public ResponseEntity<Testimonial> updateTestimonialWithImage(
            @PathVariable Long id,
            @RequestPart("data") TestimonialDTO testimonialDTO,
            @RequestPart(value = "file", required = false) MultipartFile file,
            HttpServletRequest request) {
        log.info("Request Content-Type: {}", request.getContentType());
        log.info("Inside updateTestimonialWithImage for id: {}", id);

        try {
            Testimonial updatedTestimonial = iTestimonialService.updateTestimonialWithImage(id, testimonialDTO, file);
            if (updatedTestimonial != null) {
                return ResponseEntity.ok(updatedTestimonial);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            log.error("Error updating testimonial with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Operation(summary = "Get a testimonial by ID", description = "Retrieves a testimonial using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Testimonial retrieved successfully", 
                     content = @Content(mediaType = "application/json", schema = @Schema(implementation = TestimonialDTO.class))),
        @ApiResponse(responseCode = "404", description = "Testimonial not found", content = @Content),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content)
    })
    @GetMapping("/{id}")
    public ResponseEntity<TestimonialDTO> getTestimonialById(@PathVariable Long id) {
        log.info("Fetching testimonial with id: {}", id);

        try {
            TestimonialDTO testimonialDTO = iTestimonialService.getTestimonialById(id);
            if (testimonialDTO == null) {
                log.warn("Testimonial not found with id: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(testimonialDTO);
        } catch (IllegalArgumentException e) {
            log.error("Invalid ID provided: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            log.error("An error occurred while fetching the testimonial with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
