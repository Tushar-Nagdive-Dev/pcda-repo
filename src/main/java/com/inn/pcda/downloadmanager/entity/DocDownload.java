package com.inn.pcda.downloadmanager.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import com.inn.pcda.configs.baseImplementation.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Data
@EqualsAndHashCode(callSuper = true) // Ensures proper equals/hashCode when extending a base class
@Entity
@Table(name = "doc_download")
public class DocDownload extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "title_in_hindi", nullable = false)
    private String titleInHindi;

    @Column(name = "document_path", nullable = false)
    private String documentPath;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Column(name = "ui_order", nullable = false)
    private Integer uiOrder;
}