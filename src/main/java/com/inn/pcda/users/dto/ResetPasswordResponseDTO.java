package com.inn.pcda.users.dto;

public record ResetPasswordResponseDTO(
    Long id,
    String officerName,
    String accountNo,
    String password
) {}
