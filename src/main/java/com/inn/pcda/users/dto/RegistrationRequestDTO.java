package com.inn.pcda.users.dto;

import lombok.Data;

@Data
public class RegistrationRequestDTO {
    private String username;
    private String password;
    private String officer_Name;
    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
    private String middleName;
    private String recaptchaResponse;
    private int task_no;
    private String accountno;

}
