package com.inn.pcda.newandnotication.dto;

import java.time.LocalDateTime;

import com.inn.pcda.newandnotication.enums.Status;
import com.inn.pcda.newandnotication.enums.Types;

public record NewsResponseDTO(
        Long id,
        String titleEnglish,
        String titleHindi,
        Types type,
        Status status,
        Boolean isNew,
        Integer uiOrder,
        String documentUrl,
        LocalDateTime createdDate,
        LocalDateTime updatedDate
) {}
