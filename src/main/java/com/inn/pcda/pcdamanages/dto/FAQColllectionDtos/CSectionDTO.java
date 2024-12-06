package com.inn.pcda.pcdamanages.dto.FAQColllectionDtos;

import java.util.Set;

import lombok.Data;

@Data
public class CSectionDTO {
    private Long sectionId;
    private String title;
    private Boolean isActive;
    private Set<CQuestionAnswerDTO> questionAnswers;
}
