package com.inn.pcda.pcdamanages.dto;

import com.inn.pcda.newandnotication.enums.Status;

import lombok.Data;

@Data
public class TestimonialDTO {
    
    private String name;
    private String position;
    private String testimonialBrief;
    private Status status;
    private Boolean isNew;
    private Integer imageId;
    
}
