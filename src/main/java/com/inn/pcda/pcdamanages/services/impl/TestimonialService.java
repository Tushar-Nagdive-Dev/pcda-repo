package com.inn.pcda.pcdamanages.services.impl;

import java.io.IOException;
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
    public List<Testimonial> getAllTestimonials() {
        log.info("Inside @class TestimonialService @method getAllTestimonials");
        return testimonialRepo.findAll();
    }

    @Override
    public Integer uploadProfileImage(Long id, MultipartFile file) {
        log.info("Inside @class TestimonialService @method uploadProfileImage for id: {}", id);
        if (file == null || id == null) {
            log.error("File or Testimonial ID is null");
            return null;
        }
        try {
            Integer imageId = fileUploadService.saveFile(file);
            Optional<Testimonial> optionalTestimonial = testimonialRepo.findById(id);

            if (optionalTestimonial.isPresent()) {
                Testimonial testimonial = optionalTestimonial.get();
                testimonial.setImageId(imageId);
                testimonialRepo.save(testimonial);
                return imageId;
            } else {
                log.error("Testimonial with id: {} not found", id);
                return null;
            }
        } catch (IOException e) {
            log.error("Error while uploading file: {}", e.getMessage());
            return null;
        }
    }

    @Override
    public Testimonial updateTestimonial(TestimonialDTO testimonialDTO, Long id) {
        log.info("Inside @class TestimonialService @method updateTestimonial for id: {}", id);
        if (testimonialDTO == null || id == null) {
            log.error("TestimonialDTO or ID is null");
            return null;
        }

        Optional<Testimonial> optionalTestimonial = testimonialRepo.findById(id);

        if (optionalTestimonial.isPresent()) {
            Testimonial testimonial = optionalTestimonial.get();
            mapToEntity(testimonialDTO, testimonial);
            return testimonialRepo.save(testimonial);
        } else {
            log.error("Testimonial with id: {} not found", id);
            return null;
        }
    }

    private Testimonial mapToEntity(TestimonialDTO dto) {
        Testimonial testimonial = new Testimonial();
        testimonial.setImageId(dto.getImageId());
        testimonial.setIsNew(dto.getIsNew());
        testimonial.setName(dto.getName());
        testimonial.setPosition(dto.getPosition());
        testimonial.setStatus(dto.getStatus());
        testimonial.setTestimonialBrief(dto.getTestimonialBrief());
        return testimonial;
    }

    private void mapToEntity(TestimonialDTO dto, Testimonial entity) {
        entity.setImageId(dto.getImageId());
        entity.setIsNew(dto.getIsNew());
        entity.setName(dto.getName());
        entity.setPosition(dto.getPosition());
        entity.setStatus(dto.getStatus());
        entity.setTestimonialBrief(dto.getTestimonialBrief());
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
            // Save the file and get the image ID
            Integer imageId = fileUploadService.saveFile(file);

            // Set the image ID on the testimonial object
            testimonialData.setImageId(imageId);

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
    public Testimonial getTestimonialById(Long id) {
        if (id == null || id <= 0) {
            log.error("Invalid ID provided: {}", id);
            throw new IllegalArgumentException("The provided ID must be a positive non-zero value.");
        }

        return testimonialRepo.findById(id)
                .orElseThrow(() -> {
                    log.warn("Testimonial not found with id: {}", id);
                    return new EntityNotFoundException("Testimonial not found with id: " + id);
                });
    }

}
