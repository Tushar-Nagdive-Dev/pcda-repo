package com.inn.pcda.users.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class RegistrationRequestDTO {
    private String username;
    private String password;

    @NotBlank(message = "Officer name is required.")
    private String officer_name;
    private String firstName;
    private String lastName;
    private String email;
    private String roleName;
    private String middleName;
    private String recaptchaResponse;

    @NotNull(message = "Task number is required.")
    private Integer task_no;

    @NotBlank(message = "Account number is required.")
    @Pattern(regexp = "^[a-zA-Z0-9]{7}$", message = "Account number must be 7 alphanumeric characters.")
    private String accountno;

}
