package com.inn.pcda.pcdamanages.dto.GalleryDTOdir;

import java.util.List;

import lombok.Data;

@Data
public class GallerShowDto {
    private Long id;
    private String eventName;
    private String type;
    private Integer year;
    private Boolean isActive;
    private String firstImage; // First image URL
    private List<String> imagePaths;
}
