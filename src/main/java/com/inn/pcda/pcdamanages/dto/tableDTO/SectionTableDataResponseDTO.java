package com.inn.pcda.pcdamanages.dto.tableDTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class SectionTableDataResponseDTO {
    private Long id;
    private String title;
    private Boolean isActive;
    private Long windId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
