package com.inn.pcda.pcdamanages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.pcdamanages.enums.WingsTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "fao_details")
@Data
public class FAQ  extends BaseEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private WingsTypes wings;

    private String sections;

    private String question;

    private String answers;

    @Column(name = "is_active")
    private Boolean isActive;
}
