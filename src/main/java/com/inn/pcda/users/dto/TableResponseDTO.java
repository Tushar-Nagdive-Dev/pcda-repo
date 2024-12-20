package com.inn.pcda.users.dto;

public record TableResponseDTO(
    Long id,
    String officer_name,
    String username,
    String email,
    String accountno,
    Integer task_no
) {
}
