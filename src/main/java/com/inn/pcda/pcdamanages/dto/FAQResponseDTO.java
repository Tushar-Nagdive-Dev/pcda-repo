package com.inn.pcda.pcdamanages.dto;

import java.util.List;

import lombok.Data;

@Data
public class FAQResponseDTO {
    private Long id;
    private Boolean isActive;
    private List<WingDTO> wings;

    @Data
    public static class WingDTO {
        private Long id;
        private String wingsType;
        private List<SectionDTO> sections;
    }

    @Data
    public static class SectionDTO {
        private Long id;
        private String title;
        private Boolean isActive;
        private List<QuestionAnswerDTO> questions;
    }

    @Data
    public static class QuestionAnswerDTO {
        private Long id;
        private String question;
        private String answer;
    }
}
