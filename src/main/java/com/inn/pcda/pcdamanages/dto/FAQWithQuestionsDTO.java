package com.inn.pcda.pcdamanages.dto;

import java.util.List;

import com.inn.pcda.pcdamanages.enums.WingsTypes;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FAQWithQuestionsDTO {

    @NotNull(message = "FAQ active status is required")
    private Boolean isActive;

    @NotNull(message = "Wing type is required")
    private WingsTypes wingType; // Predefined wing type

    @NotNull(message = "Section ID is required")
    private Long sectionId; // Existing section ID

    @NotNull(message = "Questions are required")
    private List<QuestionAnswerDTO> questions; // List of questions for the section

    @Data
    public static class QuestionAnswerDTO {

        @NotBlank(message = "Question is required")
        private String question;

        @NotBlank(message = "Answer is required")
        private String answer;
    }
}
