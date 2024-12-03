package com.inn.pcda.pcdamanages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.pcdamanages.enums.GalleryTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "gallery")
public class Gallery extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name")
    private String eventName;

    @Column(name = "type")
    private GalleryTypes type;

    @Column(name = "year")
    private Integer year;

    @Column(name = "is_active")
    private Boolean isActive = false;

    @Column(name = "upload_file_id")
    private Integer uploadFileId;
    
}
