package com.inn.pcda.pcdamanages.dto;
import com.inn.pcda.pcdamanages.enums.WingsTypes;
import lombok.Data;

@Data
public class FAQDetailsDTO {
    
    private WingsTypes wings;
    private String sections;
    private String question;
    private String answers;
    private Boolean isActive;
}
