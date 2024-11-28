package com.inn.pcda.messages.dto;

import com.inn.pcda.messages.enums.Status;
import com.inn.pcda.messages.enums.Types;
import lombok.Data;

@Data
public class MessageDTO {
    private String message;
    private Status status;
    private Types type;
    private Boolean flag=false;
}
