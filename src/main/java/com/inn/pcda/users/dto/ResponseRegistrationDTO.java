package com.inn.pcda.users.dto;

import lombok.Data;

@Data
public class ResponseRegistrationDTO {
    private Integer task_no;
    private String accountno;
    private String officer_Name;
    private String username;
    private String password;
}
