package com.inn.pcda.pcdamanages.services;

import java.util.List;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.entity.Testimonial;

public interface IGalleryService {
    
    public Gallery addGallery(GalleryDTO galleryDTO);

    public List<Gallery> getAllGalleries();

    public Boolean updateGalleryById(GalleryDTO galleryDTO, Long id);

    public Boolean deleteGalleryById(Long id);

    public Testimonial updateTestimonial();
}
