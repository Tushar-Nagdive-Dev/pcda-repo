package com.inn.pcda.downloadmanager.dto;

import lombok.Data;

@Data
public class UpdateDocDto {
    
    private String title;

    private String titleInHindi;

    private Boolean status;

    private Integer uiOrder; 
}
