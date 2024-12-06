package com.inn.pcda.pcdamanages.services.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.FileStorageUtil;
import com.inn.pcda.pcdamanages.dto.GalleryDTOdir.GallerShowDto;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.repos.GalleryRepo;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class GalleryServiceImpl implements IGalleryService {

    private final GalleryRepo galleryRepo;
    private final FileStorageUtil fileStorageUtil;

    private static final String BASE_URL = "http://localhost:8888";
    private static final String IMAGE_FILE_PATTERN = ".*\\.(jpg|jpeg|png|gif)$";

    @Autowired
    public GalleryServiceImpl(GalleryRepo galleryRepo, FileStorageUtil fileStorageUtil) {
        this.galleryRepo = galleryRepo;
        this.fileStorageUtil = fileStorageUtil;
    }

    @Override
    public Gallery saveGalleryWithFiles(Gallery gallery, MultipartFile[] files) {
        Gallery savedGallery = galleryRepo.save(gallery);

        try {
            String folderPath = "gallery-files/" + savedGallery.getId();
            fileStorageUtil.createFolder(folderPath);
            fileStorageUtil.storeFilesInFolder(folderPath, files);

            savedGallery.setFolderPath(folderPath);
            return galleryRepo.save(savedGallery);
        } catch (Exception e) {
            log.error("Error saving gallery files", e);
            throw new RuntimeException("Error saving gallery files: " + e.getMessage());
        }
    }

    @Override
    public List<Gallery> getAllGalleries() {
        return galleryRepo.findAll();
    }

    @Override
    public Gallery getGalleryById(Long id) {
        return galleryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found with ID: " + id));
    }

    @Override
    public boolean updateGallery(Long id, Gallery updatedGallery) {
        return galleryRepo.findById(id).map(existingGallery -> {
            updateGalleryDetails(existingGallery, updatedGallery);
            galleryRepo.save(existingGallery);
            return true;
        }).orElse(false);
    }

    private void updateGalleryDetails(Gallery existingGallery, Gallery updatedGallery) {
        existingGallery.setEventName(updatedGallery.getEventName());
        existingGallery.setType(updatedGallery.getType());
        existingGallery.setYear(updatedGallery.getYear());
        existingGallery.setIsActive(updatedGallery.getIsActive());
    }

    @Override
    public boolean deleteGallery(Long id) {
        return galleryRepo.findById(id).map(gallery -> {
            try {
                fileStorageUtil.deleteFolder(gallery.getFolderPath());
                galleryRepo.deleteById(id);
                return true;
            } catch (Exception e) {
                log.error("Error deleting gallery with ID: " + id, e);
                throw new RuntimeException("Error deleting gallery: " + e.getMessage());
            }
        }).orElse(false);
    }

    @Override
    public List<String> getFilePaths(Long galleryId) {
        Gallery gallery = getGalleryById(galleryId);
        String baseUrl = "http://localhost:8888"; // Base URL of your server
        String folderPath = gallery.getFolderPath();

        // Generate full URLs for each file
        return fileStorageUtil.getFilesInFolder(folderPath).stream()
                .map(fileName -> baseUrl + "/" + folderPath + "/" + fileName)
                .collect(Collectors.toList());
    }


    @Override
    public List<GallerShowDto> getAllGalleriesForView() {
        List<Gallery> galleries = galleryRepo.findAll();
        List<GallerShowDto> galleryDTOs = new ArrayList<>();

        for (Gallery gallery : galleries) {
            galleryDTOs.add(convertToGalleryShowDto(gallery));
        }

        return galleryDTOs;
    }

    private GallerShowDto convertToGalleryShowDto(Gallery gallery) {
        GallerShowDto dto = new GallerShowDto();
        dto.setId(gallery.getId());
        dto.setEventName(gallery.getEventName());
        dto.setType(gallery.getType().toString());
        dto.setYear(gallery.getYear());
        dto.setIsActive(gallery.getIsActive());

        populateImagePaths(dto, gallery.getFolderPath());
        return dto;
    }

    private void populateImagePaths(GallerShowDto dto, String folderPath) {
        File folder = new File(folderPath);
        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles((dir, name) -> name.toLowerCase().matches(IMAGE_FILE_PATTERN));
            if (files != null && files.length > 0) {
                List<String> imagePaths = new ArrayList<>();
                for (File file : files) {
                    imagePaths.add(BASE_URL + "/" + folderPath + "/" + file.getName());
                }
                dto.setFirstImage(imagePaths.get(0));
                dto.setImagePaths(imagePaths);
            }
        }
    }
}
