package com.inn.pcda.messages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.messages.enums.Status;
import com.inn.pcda.messages.enums.Types;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "pdcao_messages")
@Data
public class MessagesDetails extends BaseEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "status")
    private Status status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "type")
    private Types type;

    private Boolean flag=false;
}
