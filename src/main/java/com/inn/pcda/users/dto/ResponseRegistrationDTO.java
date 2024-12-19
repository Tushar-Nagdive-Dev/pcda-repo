package com.inn.pcda.users.dto;

public record ResponseRegistrationDTO(
    Long id,
    String officer_Name,
    String username,
    String email,
    String accountno,
    Integer task_no
) {
}
