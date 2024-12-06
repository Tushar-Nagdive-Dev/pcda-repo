package com.inn.pcda.pcdamanages.services.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.common.service.IFileUploadService;
import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.repos.TestimonialRepo;
import com.inn.pcda.pcdamanages.services.ITestimonialService;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestimonialService implements ITestimonialService {

    @Autowired
    private TestimonialRepo testimonialRepo;

    @Autowired
    private IFileUploadService fileUploadService;

    @Override
    public Testimonial addTestimonial(TestimonialDTO testimonialDTO) {
        log.info("Inside @class TestimonialService @method addTestimonial : {}", testimonialDTO);
        if (testimonialDTO == null) {
            log.error("TestimonialDTO is null");
            return null;
        }
        Testimonial testimonial = mapToEntity(testimonialDTO);
        return testimonialRepo.save(testimonial);
    }

    @Override
    public List<TestimonialDTO> getAllTestimonials() {
        log.info("Inside @class TestimonialService @method getAllTestimonials");

        // Fetch all testimonials from the database
        List<Testimonial> testimonials = testimonialRepo.findAll();

        // Map entities to DTOs
        return testimonials.stream()
                .map(this::mapToDTO) // Convert each Testimonial entity to TestimonialDTO
                .toList();
    }


    @Override
    public Boolean deleteTestimonialById(Long id) {
        log.info("Inside @class TestimonialService @method deleteTestimonialById for id: {}", id);
        
        if (id == null) {
            log.error("Provided ID is null");
            return false;
        }
        
        Optional<Testimonial> optionalTestimonial = testimonialRepo.findById(id);
        if (optionalTestimonial.isPresent()) {
            testimonialRepo.deleteById(id);
            log.info("Successfully deleted Testimonial with id: {}", id);
            return true;
        } else {
            log.error("Testimonial with id: {} not found", id);
            return false;
        }
    }

    @Override
    public Testimonial uploadTestimonialWithImage(Testimonial testimonialData, MultipartFile file) {
        log.info("Inside @class TestimonialService @method uploadTestimonialWithImage");

        if (file == null || testimonialData == null) {
            log.error("File or Testimonial data is null");
            return null;
        }

        try {
            // Define the path for saving the file
            String uploadDir = "uploads/testimonials/";
            String fileName = testimonialData.getId() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // Ensure the directory exists
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the file
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath);

            // Set the file path in the testimonial entity
            testimonialData.setImagePath(fileName);

            // Save the testimonial to the database
            Testimonial savedTestimonial = testimonialRepo.save(testimonialData);

            log.info("Testimonial and image saved successfully with id: {}", savedTestimonial.getId());
            return savedTestimonial;
        } catch (IOException e) {
            log.error("Error while uploading file: {}", e.getMessage());
            return null;
        }
    }


    @Override
    public TestimonialDTO getTestimonialById(Long id) {
        log.info("Inside @class TestimonialService @method getTestimonialById for id: {}", id);

        if (id == null || id <= 0) {
            log.error("Invalid ID provided: {}", id);
            throw new IllegalArgumentException("The provided ID must be a positive non-zero value.");
        }

        // Fetch testimonial by ID
        Optional<Testimonial> optionalTestimonial = testimonialRepo.findById(id);
        if (optionalTestimonial.isEmpty()) {
            log.warn("Testimonial with id: {} not found", id);
            return null;
        }

        // Map to DTO and return
        return mapToDTO(optionalTestimonial.get());
    }


    @Override
    public Testimonial createTestimonialWithImage(TestimonialDTO testimonialDTO, MultipartFile file) {
        log.info("Inside @class TestimonialService @method createTestimonialWithImage");

        if (testimonialDTO == null || file == null) {
            log.error("Testimonial data or file is null");
            return null;
        }

        try {
            // Step 1: Save testimonial data without imagePath to generate ID
            Testimonial testimonial = mapToEntity(testimonialDTO);
            Testimonial savedTestimonial = testimonialRepo.save(testimonial);
            Long testimonialId = savedTestimonial.getId();

            // Step 2: Create folder using the testimonial ID
            String uploadDir = "uploads/testimonials/" + testimonialId + "/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Step 3: Save the file in the folder
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.copy(file.getInputStream(), filePath);

            // Step 4: Update testimonial with the image path
            savedTestimonial.setImagePath(testimonialId + "/" + fileName);
            testimonialRepo.save(savedTestimonial);

            log.info("Testimonial created successfully with image: {}", savedTestimonial);
            return savedTestimonial;

        } catch (IOException e) {
            log.error("Error while saving testimonial image: {}", e.getMessage());
            return null;
        }
    }


    private void mapToEntity(TestimonialDTO dto, Testimonial testimonial) {
        testimonial.setName(dto.getName());
        testimonial.setPosition(dto.getPosition());
        testimonial.setTestimonialBrief(dto.getTestimonialBrief());
        testimonial.setStatus(dto.getStatus());
        testimonial.setIsNew(dto.getIsNew());
    }

    private Testimonial mapToEntity(TestimonialDTO dto) {
        Testimonial testimonial = new Testimonial();
        testimonial.setName(dto.getName());
        testimonial.setPosition(dto.getPosition());
        testimonial.setTestimonialBrief(dto.getTestimonialBrief());
        testimonial.setStatus(dto.getStatus());
        testimonial.setIsNew(dto.getIsNew());
        return testimonial;
    }

    private TestimonialDTO mapToDTO(Testimonial entity) {
        TestimonialDTO dto = new TestimonialDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPosition(entity.getPosition());
        dto.setTestimonialBrief(entity.getTestimonialBrief());
        dto.setStatus(entity.getStatus());
        dto.setIsNew(entity.getIsNew());
        dto.setImagePath(entity.getImagePath()); // Include the image path
        return dto;
    }
    
    @Override
    public Testimonial updateTestimonialWithImage(Long id, TestimonialDTO testimonialDTO, MultipartFile file) {
        log.info("Inside @class TestimonialService @method updateTestimonialWithImage for id: {}", id);

        if (id == null || testimonialDTO == null) {
            log.error("Testimonial ID or data is null");
            return null;
        }

        // Step 1: Fetch the existing testimonial
        Optional<Testimonial> optionalTestimonial = testimonialRepo.findById(id);
        if (optionalTestimonial.isEmpty()) {
            log.warn("Testimonial with id: {} not found", id);
            return null;
        }

        Testimonial testimonial = optionalTestimonial.get();

        // Step 2: Update testimonial details
        mapToEntity(testimonialDTO, testimonial);

        try {
            if (file != null) {
                // Step 3: Handle file replacement
                String uploadDir = "uploads/testimonials/" + id + "/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                // Delete the old image if it exists
                if (testimonial.getImagePath() != null) {
                    File oldFile = new File(uploadDir + testimonial.getImagePath());
                    if (oldFile.exists()) {
                        oldFile.delete();
                    }
                }

                // Save the new image
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.copy(file.getInputStream(), filePath);

                // Update the imagePath field
                testimonial.setImagePath(id + "/" + fileName);
            }

            // Step 4: Save the updated testimonial to the database
            Testimonial updatedTestimonial = testimonialRepo.save(testimonial);
            log.info("Testimonial updated successfully with id: {}", updatedTestimonial.getId());
            return updatedTestimonial;

        } catch (IOException e) {
            log.error("Error while updating testimonial image for id {}: {}", id, e.getMessage());
            return null;
        }
    }
    

}
