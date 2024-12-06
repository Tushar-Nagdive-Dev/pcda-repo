package com.inn.pcda.pcdamanages.entity;

import java.util.List;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.pcdamanages.enums.GalleryTypes;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;

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
    private List<Integer> uploadFileIds;
}
