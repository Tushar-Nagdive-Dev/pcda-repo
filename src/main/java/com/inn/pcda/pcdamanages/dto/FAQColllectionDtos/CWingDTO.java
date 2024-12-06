package com.inn.pcda.pcdamanages.dto.FAQColllectionDtos;

import java.util.Set;

import lombok.Data;

@Data
public class CWingDTO {
    private Long wingId;
    private String wingsType;
    private Set<CSectionDTO> sections;
}
