package com.inn.pcda.pcdamanages.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.GalleryDTOdir.GallerShowDto;
import com.inn.pcda.pcdamanages.entity.Gallery;

public interface IGalleryService {
    Gallery saveGalleryWithFiles(Gallery gallery, MultipartFile[] files);
    List<Gallery> getAllGalleries();
    Gallery getGalleryById(Long id);
    boolean updateGallery(Long id, Gallery updatedGallery);
    boolean deleteGallery(Long id);
    List<String> getFilePaths(Long galleryId);
    public List<GallerShowDto> getAllGalleriesForView();
}
