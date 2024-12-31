package com.inn.pcda.users.entity;

import com.inn.pcda.configs.baseimplementation.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "register_user_file_metadata")
public class RegisterUserJsonFileMetadata extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column(name = "total_records", nullable = false)
    private int totalRecords;

     @Column(name = "processed_records", nullable = false)
    private int processedRecords;

    public enum Status {
        Pending,
        Processing,
        Complete,
        Failed
    }

    @Column(nullable = false)
    private Status status; 
}
