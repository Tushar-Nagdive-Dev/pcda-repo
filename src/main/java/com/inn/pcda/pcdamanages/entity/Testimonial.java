package com.inn.pcda.pcdamanages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.newandnotication.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "testimonial")
public class Testimonial extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private String position;

    @Column(name = "testimonial_brief", columnDefinition = "TEXT")
    private String testimonialBrief;

    @Column(name = "status")
    private Status status;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "image_path") // Add column to store image path
    private String imagePath;
}
