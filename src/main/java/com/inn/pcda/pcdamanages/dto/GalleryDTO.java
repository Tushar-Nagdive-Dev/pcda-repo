package com.inn.pcda.pcdamanages.dto;

import com.inn.pcda.pcdamanages.enums.GalleryTypes;

import lombok.Data;

@Data
public class GalleryDTO {
    private String eventName;
    private GalleryTypes type;
    private Integer year;
    private Boolean isActive;
    private Integer uploadFileId;
}
