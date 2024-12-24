package com.inn.pcda.users.dto;



public record ResponseRegistrationDTO(
    String officer_name,
    String username,
    String passowrd,
    String email,
    String accountno,
    Integer task_no
) {
}
