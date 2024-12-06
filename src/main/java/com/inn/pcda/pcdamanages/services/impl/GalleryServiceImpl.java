package com.inn.pcda.pcdamanages.services.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.FileStorageUtil;
import com.inn.pcda.pcdamanages.dto.GalleryDTOdir.GallerShowDto;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.repos.GalleryRepo;
import com.inn.pcda.pcdamanages.services.IGalleryService;

@Service
public class GalleryServiceImpl implements IGalleryService {

    @Autowired
    private GalleryRepo galleryRepo;

    @Autowired
    private FileStorageUtil fileStorageUtil;

    private final String baseUrl = "http://localhost:8888";

    @Override
    public Gallery saveGalleryWithFiles(Gallery gallery, MultipartFile[] files) {
        Gallery savedGallery = galleryRepo.save(gallery);

        String folderPath = "gallery-files/" + savedGallery.getId();
        fileStorageUtil.createFolder(folderPath);
        fileStorageUtil.storeFilesInFolder(folderPath, files);

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
            fileStorageUtil.deleteFolder(gallery.getFolderPath());
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

    @Override
    public List<GallerShowDto> getAllGalleriesForView() {
        List<Gallery> galleries = galleryRepo.findAll();
        List<GallerShowDto> galleryDTOs = new ArrayList<>();

        for (Gallery gallery : galleries) {
            GallerShowDto dto = new GallerShowDto();
            dto.setId(gallery.getId());
            dto.setEventName(gallery.getEventName());
            dto.setType(gallery.getType().toString());
            dto.setYear(gallery.getYear());
            dto.setIsActive(gallery.getIsActive());

            File folder = new File(gallery.getFolderPath());
            if (folder.exists() && folder.isDirectory()) {
                File[] files = folder.listFiles((dir, name) -> name.toLowerCase().matches(".*\\.(jpg|jpeg|png|gif)$"));
                if (files != null && files.length > 0) {
                    dto.setFirstImage(baseUrl + "/" + folder.getPath() + "/" + files[0].getName());
                    List<String> imagePaths = new ArrayList<>();
                    for (File file : files) {
                        imagePaths.add(baseUrl + "/" + folder.getPath() + "/" + file.getName());
                    }
                    dto.setImagePaths(imagePaths);
                }
            }

            galleryDTOs.add(dto);
        }

        return galleryDTOs;
    }
}
