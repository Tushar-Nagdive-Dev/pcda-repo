package com.inn.pcda.pcdamanages.entity;

import java.util.ArrayList;
import java.util.List;

import com.inn.pcda.pcdamanages.enums.WingsTypes;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "wings")
@Data
public class Wing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "faq_id", nullable = false)
    private FAQ faq;

    @Enumerated(EnumType.STRING)
    @Column(name = "wings_type", nullable = false)
    private WingsTypes wingsType;

    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Section> sections = new ArrayList<>(); // Add this relationship
}
