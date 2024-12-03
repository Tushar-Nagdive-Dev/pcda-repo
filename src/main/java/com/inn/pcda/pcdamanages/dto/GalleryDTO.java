package com.inn.pcda.pcdamanages.dto;

import com.inn.pcda.pcdamanages.enums.GalleryTypes;
import lombok.Data;

import java.util.List;

@Data
public class GalleryDTO {
    private String eventName;
    private GalleryTypes type;
    private Integer year;
    private Boolean isActive;
    private List<Integer> uploadFileIds; // List to support multiple file attachments
}
