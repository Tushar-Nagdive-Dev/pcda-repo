package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.repos.GalleryRepo;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GalleryService implements IGalleryService{

    @Autowired
    private GalleryRepo galleryRepo;

    @Override
    public Gallery addGallery(GalleryDTO galleryDTO) {
        log.info("Inside @class GalleryService @method addGallery");
        Gallery gallery = new Gallery();
        gallery.setEventName(galleryDTO.getEventName());
        gallery.setIsActive(galleryDTO.getIsActive());
        gallery.setType(galleryDTO.getType());
        gallery.setYear(galleryDTO.getYear());
        gallery.setUploadFileId(galleryDTO.getUploadFileId());
        return this.galleryRepo.save(gallery);
    }

    @Override
    public List<Gallery> getAllGalleries() {
        log.info("Inside @class GalleryService @method getAllGalleries");
        return this.galleryRepo.findAll();
    }
    
}
