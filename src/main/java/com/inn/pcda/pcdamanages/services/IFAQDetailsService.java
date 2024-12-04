package com.inn.pcda.pcdamanages.services;

import java.util.List;

import com.inn.pcda.pcdamanages.dto.FAQDetailsDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;

public interface IFAQDetailsService {
    
    public FAQ addFAQDetails(FAQDetailsDTO FAQDetailsDTO);

    public List<FAQ> getAllFAQs();

    public Boolean updateFAQDetails(Long id, FAQDetailsDTO faqDetailsDTO);

    public Boolean deleteFAQbyId(Long id);
}
