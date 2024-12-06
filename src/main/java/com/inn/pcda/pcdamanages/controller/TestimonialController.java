package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.services.ITestimonialService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Slf4j
@RestController
@RequestMapping("/api/testimonial")
public class TestimonialController {

    @Autowired
    private ITestimonialService iTestimonialService;

    @PostMapping
    public ResponseEntity<Testimonial> addTestimonial(@RequestBody TestimonialDTO testimonialDTO) {
        log.info("Inside @class TestimonialController @method addTestimonial : {}", testimonialDTO);
        Testimonial createdTestimonial = iTestimonialService.addTestimonial(testimonialDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTestimonial);
    }

    @GetMapping()
    public ResponseEntity<List<TestimonialDTO>> getAllTestimonials() {
        log.info("Inside @class TestimonialController @method getAllTestimonials");

        try {
            // Fetch all testimonials
            List<TestimonialDTO> testimonials = iTestimonialService.getAllTestimonials();
            if (testimonials.isEmpty()) {
                log.info("No testimonials found.");
                return ResponseEntity.noContent().build(); // 204 No Content
            }
            return ResponseEntity.ok(testimonials); // 200 OK
        } catch (Exception e) {
            log.error("Error fetching testimonials: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500 Internal Server Error
        }
    }
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

    @PostMapping("/create")
    public ResponseEntity<Testimonial> createTestimonialWithImage(
            @RequestPart("data") TestimonialDTO testimonialDTO,
            @RequestPart("file") MultipartFile file) {
        log.info("Inside @class TestimonialController @method createTestimonialWithImage");

        try {
            // Create testimonial and save image
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

    @PutMapping("/update/{id}")
    public ResponseEntity<Testimonial> updateTestimonialWithImage(
            @PathVariable Long id,
            @RequestPart("data") TestimonialDTO testimonialDTO,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        log.info("Inside @class TestimonialController @method updateTestimonialWithImage for id: {}", id);

        try {
            // Update testimonial details and image if provided
            Testimonial updatedTestimonial = iTestimonialService.updateTestimonialWithImage(id, testimonialDTO, file);
            if (updatedTestimonial != null) {
                return ResponseEntity.ok(updatedTestimonial); // 200 OK
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
            }
        } catch (Exception e) {
            log.error("Error updating testimonial with id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialDTO> getTestimonialById(@PathVariable Long id) {
        log.info("Fetching testimonial with id: {}", id);

        try {
            // Fetch the testimonial
            TestimonialDTO testimonialDTO = iTestimonialService.getTestimonialById(id);
            if (testimonialDTO == null) {
                log.warn("Testimonial not found with id: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
            }
            return ResponseEntity.ok(testimonialDTO); // 200 OK
        } catch (IllegalArgumentException e) {
            log.error("Invalid ID provided: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request
        } catch (Exception e) {
            log.error("An error occurred while fetching the testimonial with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }




}
