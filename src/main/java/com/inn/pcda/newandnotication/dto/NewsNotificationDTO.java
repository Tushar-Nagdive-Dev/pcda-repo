package com.inn.pcda.newandnotication.dto;

import com.inn.pcda.newandnotication.enums.Status;
import com.inn.pcda.newandnotication.enums.Types;

import lombok.Data;

@Data
public class NewsNotificationDTO {
    
    private String titleEnglish;
    private String titleHindi;
    private Types type;
    private Status status;
    private Boolean isNew;
    private Integer uiOrder;
    private String documentUrl;
}
