package com.inn.pcda.pcdamanages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.pcdamanages.enums.GalleryTypes;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "gallery")
public class Gallery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private GalleryTypes type;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = false;

    @ElementCollection
    @CollectionTable(name = "gallery_files", joinColumns = @JoinColumn(name = "gallery_id"))
    @Column(name = "file_id", nullable = false)
    private List<Integer> uploadFileIds; // List to support multiple file IDs
}
