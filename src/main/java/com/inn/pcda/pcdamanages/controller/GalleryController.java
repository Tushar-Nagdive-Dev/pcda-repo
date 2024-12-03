package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.GalleryDTO;
import com.inn.pcda.pcdamanages.entity.Gallery;
import com.inn.pcda.pcdamanages.services.IGalleryService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@Slf4j
@RestController("/api/gellery")
public class GalleryController {

    @Autowired
    private IGalleryService iGalleryService;
    
    @PostMapping()
    public Gallery addGallery(@RequestBody GalleryDTO galleryDTO) {
        log.info("Inside @class GalleryController @methos addGallery");
        return iGalleryService.addGallery(galleryDTO);
    }

    @GetMapping()
    public List<Gallery> getAllGallery() {
        return iGalleryService.getAllGalleries();
    }
    
    
}
