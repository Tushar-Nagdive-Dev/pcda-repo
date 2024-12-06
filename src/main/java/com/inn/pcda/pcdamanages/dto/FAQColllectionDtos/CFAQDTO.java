package com.inn.pcda.pcdamanages.dto.FAQColllectionDtos;

import java.util.Set;

import lombok.Data;

@Data
public class CFAQDTO {
    private Long faqId;
    private Boolean isActive;
    private Set<CWingDTO> wings;
}
