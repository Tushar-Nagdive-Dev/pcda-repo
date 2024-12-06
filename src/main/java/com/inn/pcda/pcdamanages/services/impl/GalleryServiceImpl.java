package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.FileStorageUtil;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.repos.GalleryRepo;
import com.inn.pcda.pcdamanages.services.GalleryService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GalleryServiceImpl implements GalleryService {

    @Autowired
    private GalleryRepo galleryRepo;

    @Autowired
    private FileStorageUtil fileStorageUtil;

    @Override
    public Gallery saveGalleryWithFiles(Gallery gallery, MultipartFile[] files) {
        // Save gallery metadata
        Gallery savedGallery = galleryRepo.save(gallery);

        // Create folder path using gallery ID
        String folderPath = "gallery-files/" + savedGallery.getId();
        fileStorageUtil.createFolder(folderPath);

        // Store files in the folder
        fileStorageUtil.storeFilesInFolder(folderPath, files);

        // Update gallery with folder path
        savedGallery.setFolderPath(folderPath);
        return galleryRepo.save(savedGallery);
    }

    @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepo.findAll();
    }

    @Override
    public Gallery getGalleryById(Long id) {
        return galleryRepo.findById(id).orElse(null);
    }

    @Override
    public boolean updateGallery(Long id, Gallery updatedGallery) {
        Optional<Gallery> optionalGallery = galleryRepo.findById(id);
        if (optionalGallery.isPresent()) {
            Gallery gallery = optionalGallery.get();
            gallery.setEventName(updatedGallery.getEventName());
            gallery.setType(updatedGallery.getType());
            gallery.setYear(updatedGallery.getYear());
            gallery.setIsActive(updatedGallery.getIsActive());
            galleryRepo.save(gallery);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteGallery(Long id) {
        Optional<Gallery> optionalGallery = galleryRepo.findById(id);
        if (optionalGallery.isPresent()) {
            Gallery gallery = optionalGallery.get();

            // Delete folder and files
            fileStorageUtil.deleteFolder(gallery.getFolderPath());

            // Delete gallery record
            galleryRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<String> getFilePaths(Long galleryId) {
        Gallery gallery = galleryRepo.findById(galleryId)
                .orElseThrow(() -> new RuntimeException("Gallery not found"));
        return fileStorageUtil.getFilesInFolder(gallery.getFolderPath());
    }
}
