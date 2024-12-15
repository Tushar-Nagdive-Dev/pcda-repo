package com.inn.pcda.newandnotication.entity;

import com.inn.pcda.configs.baseimplementation.BaseEntity;
import com.inn.pcda.newandnotication.enums.Status;
import com.inn.pcda.newandnotication.enums.Types;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "news_and_notifications")
@Data
public class NewsAndNotification extends BaseEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title_english", columnDefinition = "TEXT")
    private String titleEnglish;

    @Column(name = "title_hindi", columnDefinition = "TEXT")
    private String titleHindi;

    private Types type;

    private Status status;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "ui_order")
    private Integer uiOrder;

    @Column(name = "document_url", columnDefinition = "TEXT")
    private String documentUrl;

}
