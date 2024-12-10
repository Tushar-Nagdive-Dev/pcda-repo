package com.inn.pcda.pcdamanages.services;

import java.util.List;

import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.FAQTableDataResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.SectionTableDataResponseDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Section;

public interface IFAQDetailsService {

    public Section addSection(SectionDTO sectionDTO);

    public FAQ addFAQWithQuestionsAndAnswers(FAQWithQuestionsDTO faqWithQuestionsDTO);

    public List<Section> getSectionByWing(Long id);

    public List<FAQTableDataResponseDTO> getFAQTableData();

    public List<SectionTableDataResponseDTO> getSectionForTable();

    public Section updateSectionTitle(String title, Long id, Boolean isActive);

    public void deleteSectionById(Long id);

    public Boolean deleteQuestionById(Long id);
}
