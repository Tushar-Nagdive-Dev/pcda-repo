package com.inn.pcda.users.dto;

public record OfficerDetailsDTO(
    String officerName,
    String accountNo,
    String username,
    String password,
    String securityQuestion,
    String securityAnswer,
    String repachta,
    Long userId
) {}
