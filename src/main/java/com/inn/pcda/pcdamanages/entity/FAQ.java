package com.inn.pcda.pcdamanages.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inn.pcda.configs.baseImplementation.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "faq_details")
@Data
public class FAQ extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_active")
    private Boolean isActive;

    @OneToMany(mappedBy = "faq", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Wing> wings = new ArrayList<>();
}
