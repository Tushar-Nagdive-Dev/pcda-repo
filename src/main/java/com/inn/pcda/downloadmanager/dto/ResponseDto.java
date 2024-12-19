package com.inn.pcda.downloadmanager.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ResponseDto {

    private Long id;
    private String title;
    private String titleInHindi;
    private String documentPath;
    private Boolean status;
    private Integer uiOrder;
    private Long wingId;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
