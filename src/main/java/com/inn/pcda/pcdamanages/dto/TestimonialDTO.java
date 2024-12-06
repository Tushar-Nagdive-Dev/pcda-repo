package com.inn.pcda.pcdamanages.dto;


import com.inn.pcda.newandnotication.enums.Status;

import lombok.Data;

@Data
public class TestimonialDTO {

    private Long id; // ID for updates (optional for creation)
    private String name; // Testimonial giver's name
    private String position; // Their position (e.g., Manager, CEO)
    private String testimonialBrief; // Brief description or feedback
    private Status status; // Status of the testimonial (e.g., ACTIVE, INACTIVE)
    private Boolean isNew; // Indicates if the testimonial is new
    private String imagePath; // Path or URL for the image (optional for response)
}
