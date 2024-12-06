package com.inn.pcda.pcdamanages.entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.inn.pcda.pcdamanages.enums.WingsTypes;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "wings")
@Data
public class Wing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "faq_id", nullable = false)
    @JsonIgnore
    private FAQ faq;

    @Enumerated(EnumType.STRING)
    @Column(name = "wings_type", nullable = false)
    private WingsTypes wingsType;

    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    @ToString.Exclude
    private Set<Section> sections = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Wing wing = (Wing) o;
        return Objects.equals(id, wing.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
