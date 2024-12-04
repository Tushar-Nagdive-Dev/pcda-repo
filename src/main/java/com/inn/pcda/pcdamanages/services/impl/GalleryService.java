package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.repos.GalleryRepo;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GalleryService implements IGalleryService {

    @Autowired
    private GalleryRepo galleryRepo;

    @Override
    public Gallery addGallery(GalleryDTO galleryDTO) {
        log.info("Inside @class GalleryService @method addGallery");

        if (galleryDTO == null) {
            log.warn("GalleryDTO is null, cannot add gallery.");
            throw new IllegalArgumentException("Gallery data cannot be null");
        }

        try {
            Gallery gallery = new Gallery();
            gallery.setEventName(galleryDTO.getEventName());
            gallery.setType(galleryDTO.getType());
            gallery.setYear(galleryDTO.getYear());
            gallery.setIsActive(galleryDTO.getIsActive() != null ? galleryDTO.getIsActive() : false); // Default to false
            gallery.setUploadFileIds(galleryDTO.getUploadFileIds() != null ? galleryDTO.getUploadFileIds() : List.of()); // Default empty list

            Gallery savedGallery = galleryRepo.save(gallery);
            log.info("Gallery successfully added with ID: {}", savedGallery.getId());
            return savedGallery;
        } catch (Exception e) {
            log.error("Error while adding gallery", e);
            throw new RuntimeException("Failed to add gallery", e);
        }
    }

    @Override
    public List<Gallery> getAllGalleries() {
        log.info("Inside @class GalleryService @method getAllGalleries");
        try {
            List<Gallery> galleries = galleryRepo.findAll();
            if (galleries == null || galleries.isEmpty()) {
                log.info("No galleries found.");
            }
            return galleries;
        } catch (Exception e) {
            log.error("Error while fetching all galleries", e);
            throw new RuntimeException("Failed to fetch galleries", e);
        }
    }

    @Override
    public Boolean updateGalleryById(GalleryDTO galleryDTO, Long id) {
        log.info("Inside @class GalleryService @method updateGalleryById id: {}", id);

        if (galleryDTO == null) {
            log.warn("GalleryDTO is null for update operation.");
            throw new IllegalArgumentException("Gallery data cannot be null");
        }

        try {
            Optional<Gallery> galleryOptional = galleryRepo.findById(id);

            if (galleryOptional.isPresent()) {
                Gallery galleryDb = galleryOptional.get();
                galleryDb.setEventName(galleryDTO.getEventName());
                galleryDb.setType(galleryDTO.getType());
                galleryDb.setYear(galleryDTO.getYear());
                galleryDb.setIsActive(galleryDTO.getIsActive() != null ? galleryDTO.getIsActive() : galleryDb.getIsActive());
                galleryDb.setUploadFileIds(galleryDTO.getUploadFileIds() != null ? galleryDTO.getUploadFileIds() : galleryDb.getUploadFileIds());

                galleryRepo.save(galleryDb);
                log.info("Gallery successfully updated with ID: {}", id);
                return true;
            } else {
                log.warn("Gallery with ID: {} not found.", id);
                return false;
            }
        } catch (Exception e) {
            log.error("Error while updating gallery with ID: {}", id, e);
            throw new RuntimeException("Failed to update gallery", e);
        }
    }

    @Override
    public Boolean deleteGalleryById(Long id) {
        log.info("Inside @class GalleryService @method deleteGalleryById id: {}", id);

        try {
            Optional<Gallery> galleryOptional = galleryRepo.findById(id);

            if (galleryOptional.isPresent()) {
                galleryRepo.deleteById(id);
                log.info("Gallery successfully deleted with ID: {}", id);
                return true;
            } else {
                log.warn("Gallery with ID: {} not found for deletion.", id);
                return false;
            }
        } catch (Exception e) {
            log.error("Error while deleting gallery with ID: {}", id, e);
            throw new RuntimeException("Failed to delete gallery", e);
        }
    }

    @Override
    public Testimonial updateTestimonial() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateTestimonial'");
    }
}
