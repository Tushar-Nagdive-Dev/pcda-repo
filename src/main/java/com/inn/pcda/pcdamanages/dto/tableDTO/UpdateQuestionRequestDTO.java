package com.inn.pcda.pcdamanages.dto.tableDTO;

import lombok.Data;

@Data
public class UpdateQuestionRequestDTO {
    private String question;
    private String answer;
    private Long wingId;
    private Long sectionId;
    private Boolean isActive;
}
