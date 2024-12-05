package com.inn.pcda.pcdamanages.services;

import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Section;

public interface IFAQDetailsService {

    public Section addSection(SectionDTO sectionDTO);

    public FAQ addFAQWithQuestionsAndAnswers(FAQWithQuestionsDTO faqWithQuestionsDTO);
}
