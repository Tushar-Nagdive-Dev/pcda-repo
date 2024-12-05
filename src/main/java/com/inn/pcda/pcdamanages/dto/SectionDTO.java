package com.inn.pcda.pcdamanages.dto;

import com.inn.pcda.pcdamanages.enums.WingsTypes;

import lombok.Data;

@Data
public class SectionDTO {
    private WingsTypes wingType; // Predefined wing type
    private String sectionName; // Name of the section
    private Boolean isActive;
}
