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

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        log.info("Inside @class TestimonialController @method getAllTestimonials");
        List<Testimonial> testimonials = iTestimonialService.getAllTestimonials();
        if (testimonials.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(testimonials);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Testimonial> updateTestimonial(
            @RequestBody TestimonialDTO testimonialDTO, 
            @PathVariable("id") Long id) {
        log.info("Inside @class TestimonialController @method updateTestimonial for id: {}", id);
        Testimonial updatedTestimonial = iTestimonialService.updateTestimonial(testimonialDTO, id);
        if (updatedTestimonial == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTestimonial);
    }

    // @PostMapping("/{id}/upload")
    // public ResponseEntity<Integer> uploadProfileImage(
    //         @PathVariable Long id, 
    //         @RequestParam("file") MultipartFile file) {
    //     log.info("Inside @class TestimonialController @method uploadProfileImage for id: {}", id);
    //     Integer imageId = iTestimonialService.uploadProfileImage(id, file);
    //     if (imageId == null) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    //     }
    //     return ResponseEntity.ok(imageId);
    // }

    @PostMapping("/upload")
    public ResponseEntity<Testimonial> uploadTestimonialWithImage(
            @RequestPart("data") Testimonial testimonialData, 
            @RequestPart("file") MultipartFile file) {
        log.info("Inside @class TestimonialController @method uploadTestimonialWithImage");
        Testimonial savedTestimonial = iTestimonialService.uploadTestimonialWithImage(testimonialData, file);

        if (savedTestimonial == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.ok(savedTestimonial);
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

    @GetMapping("/{id}")
    public ResponseEntity<Testimonial> getTestimonialById(@PathVariable("id") Long id) {
        log.info("Fetching testimonial with id: {}", id);

        try {
            // Fetch testimonial by ID with validation
            Testimonial testimonial = iTestimonialService.getTestimonialById(id);

            if (testimonial == null) {
                log.warn("Testimonial not found with id: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            return ResponseEntity.ok(testimonial);
        } catch (IllegalArgumentException e) {
            log.error("Invalid ID provided: {}", id, e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            log.error("An error occurred while fetching the testimonial with id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    

}
