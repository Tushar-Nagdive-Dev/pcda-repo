package com.inn.pcda.pcdamanages.dto.tableDTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class FAQTableDataResponseDTO {
    private Long id;
    private Long faqId;
    private String question;
    private String answer;
    private Boolean faqStatus;
    private WingDTO wing;
    private SectionDTO section;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    @Data
    public static class WingDTO {
        private Long id;
        private String name;
    }

    @Data
    public static class SectionDTO {
        private Long id;
        private String name;
    }
}
