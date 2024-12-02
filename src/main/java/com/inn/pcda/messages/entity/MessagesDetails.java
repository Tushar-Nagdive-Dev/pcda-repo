package com.inn.pcda.messages.entity;

import com.inn.pcda.configs.baseImplementation.BaseEntity;
import com.inn.pcda.messages.enums.Status;
import com.inn.pcda.messages.enums.StatusConverter;
import com.inn.pcda.messages.enums.Types;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pdcao_messages")
@Data
@Builder // Enables the builder pattern
@NoArgsConstructor // Required by JPA
@AllArgsConstructor // Required for Lombok's @Builder
public class MessagesDetails extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Convert(converter = StatusConverter.class) // Custom converter for Status
    @Column(nullable = false, name = "status")
    private Status status;

    @Enumerated(EnumType.STRING) // Store as string in the database
    @Column(nullable = false, name = "type")
    private Types type;

    @Builder.Default // Default value for flag in the builder
    @Column(nullable = false)
    private Boolean flag = false;

    private Integer order;

    // Additional fields from BaseEntity are inherited
}
