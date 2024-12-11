package com.inn.pcda.pcdamanages.dto.tableDTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class QuestionAnswerResponseDTO {

    private Long id;
    private Long faqId;
    private String question;
    private String answer;
    private Boolean faqStatus;
    private WingResponse wing;
    private SectionResponse section;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Data
    public static class WingResponse {
        private Long id;
        private String name;
    }

    @Data
    public static class SectionResponse {
        private Long id;
        private String name;
    }
    
}
