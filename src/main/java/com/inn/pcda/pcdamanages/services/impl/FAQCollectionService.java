package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CFAQDTO;
import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CQuestionAnswerDTO;
import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CSectionDTO;
import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CWingDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.QuestionAnswer;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.repos.FAQRepository;

@Service
public class FAQCollectionService {
    
    @Autowired
    private FAQRepository faqRepository;

    public List<CFAQDTO> getFAQCollectionsWithPoints() {
        List<FAQ> faqs = faqRepository.findFAQWithHierarchy(); // Use a custom query if needed to optimize data fetching
        return faqs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private CFAQDTO mapToDTO(FAQ faq) {
        CFAQDTO faqDTO = new CFAQDTO();
        faqDTO.setFaqId(faq.getId());
        faqDTO.setIsActive(faq.getIsActive());
        faqDTO.setWings(faq.getWings().stream().map(this::mapWingToDTO).collect(Collectors.toSet()));
        return faqDTO;
    }

    private CWingDTO mapWingToDTO(Wing wing) {
        CWingDTO wingDTO = new CWingDTO();
        wingDTO.setWingId(wing.getId());
        wingDTO.setWingsType(wing.getWingsType().name());
        wingDTO.setSections(wing.getSections().stream().map(this::mapSectionToDTO).collect(Collectors.toSet()));
        return wingDTO;
    }

    private CSectionDTO mapSectionToDTO(Section section) {
        CSectionDTO sectionDTO = new CSectionDTO();
        sectionDTO.setSectionId(section.getId());
        sectionDTO.setTitle(section.getTitle());
        sectionDTO.setIsActive(section.getIsActive());
        sectionDTO.setQuestionAnswers(section.getQuestionAnswers().stream().map(this::mapQuestionAnswerToDTO).collect(Collectors.toSet()));
        return sectionDTO;
    }

    private CQuestionAnswerDTO mapQuestionAnswerToDTO(QuestionAnswer questionAnswer) {
        CQuestionAnswerDTO qaDTO = new CQuestionAnswerDTO();
        qaDTO.setId(questionAnswer.getId());
        qaDTO.setQuestion(questionAnswer.getQuestion());
        qaDTO.setAnswer(questionAnswer.getAnswer());
        return qaDTO;
    }
}
