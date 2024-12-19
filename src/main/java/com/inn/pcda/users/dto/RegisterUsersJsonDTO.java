package com.inn.pcda.users.dto;

public record RegisterUsersJsonDTO(
    String officerName,
    String accountNo,
    String email,
    Integer taskNo
) {}
