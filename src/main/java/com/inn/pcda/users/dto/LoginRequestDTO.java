package com.inn.pcda.users.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String captchaInput;
    private String captchaToken;
    private String password;
    private String username;
}
