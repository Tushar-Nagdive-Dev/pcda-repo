package com.inn.pcda.users.entity;

import java.util.List;

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
@Table(name = "roles")
@Data
public class Roles extends BaseEntity{
    
   @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g., 'ADMIN', 'USER', etc.

    @Column
    private String description; // Optional role description

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<Users> users; // List of users with this role
}
