package com.inn.pcda.pcdamanages.services;

import java.util.List;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;

public interface IGalleryService {
    
    public Gallery addGallery(GalleryDTO galleryDTO);

    public List<Gallery> getAllGalleries();
}
