package com.inn.pcda.pcdamanages.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.entity.Testimonial;

public interface IGalleryService {
    
    public Gallery addGallery(GalleryDTO galleryDTO);

    public List<Gallery> getAllGalleries();

    public Boolean updateGalleryById(GalleryDTO galleryDTO, Long id);

    public Boolean deleteGalleryById(Long id);

    public Testimonial updateTestimonial();

    public List<Integer> uploadFiles(Long id, MultipartFile[] files);

    public Gallery saveAndUploadGallery(Gallery galleryData, MultipartFile[] files);

    public Gallery getGalleryById(Long id);
}
