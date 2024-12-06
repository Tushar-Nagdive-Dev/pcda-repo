package com.inn.pcda.pcdamanages.services.impl;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.FAQResponseDTO;
import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.QuestionAnswer;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.repos.FAQRepository;
import com.inn.pcda.pcdamanages.repos.QuestionAnswerRepository;
import com.inn.pcda.pcdamanages.repos.SectionRepository;
import com.inn.pcda.pcdamanages.repos.WingRepository;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FAQDetailsService implements IFAQDetailsService{

    @Autowired
    private FAQRepository faqRepo;

    @Autowired
    private WingRepository wingRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;

    @Override
    public Section addSection(SectionDTO sectionDTO) {
        // Step 1: Fetch the predefined wing by WingsType
        Wing wing = wingRepository.findByWingsType(sectionDTO.getWingType())
                .orElseThrow(() -> new RuntimeException("Wing not found for type: " + sectionDTO.getWingType()));

        // Step 2: Create a new section
        Section section = new Section();
        section.setWing(wing);
        section.setTitle(sectionDTO.getSectionName());
        section.setIsActive(sectionDTO.getIsActive());

        // Step 3: Save and return the section
        return sectionRepository.save(section);
    }

    @Override
    public FAQ addFAQWithQuestionsAndAnswers(FAQWithQuestionsDTO faqWithQuestionsDTO) {
        // Step 1: Find the Wing by WingType
        Wing wing = wingRepository.findByWingsType(faqWithQuestionsDTO.getWingType())
                .orElseThrow(() -> new RuntimeException("Wing not found for type: " + faqWithQuestionsDTO.getWingType()));

        // Step 2: Validate and Find the Section
        Section section = sectionRepository.findByIdAndWing(faqWithQuestionsDTO.getSectionId(), wing)
                .orElseThrow(() -> new RuntimeException("Section not found with ID: " + faqWithQuestionsDTO.getSectionId() + " under Wing: " + wing.getWingsType()));

        // Step 3: Create and Save the FAQ
        FAQ faq = new FAQ();
        faq.setIsActive(faqWithQuestionsDTO.getIsActive());
        FAQ savedFAQ = faqRepo.save(faq);

        // Step 4: Add Questions to the Section
        for (FAQWithQuestionsDTO.QuestionAnswerDTO questionDTO : faqWithQuestionsDTO.getQuestions()) {
            QuestionAnswer questionAnswer = new QuestionAnswer();
            questionAnswer.setSection(section);
            questionAnswer.setQuestion(questionDTO.getQuestion());
            questionAnswer.setAnswer(questionDTO.getAnswer());
            questionAnswerRepository.save(questionAnswer);
        }

        return savedFAQ;
    }

    public List<FAQResponseDTO> getAllFAQs() {
        // Fetch all FAQs with their details
        List<FAQ> faqs = faqRepo.findAllWithDetails();

        // Map each FAQ entity to the response DTO
        return faqs.stream()
                .map(this::mapToFAQResponseDTO)
                .toList();
    }

    private FAQResponseDTO mapToFAQResponseDTO(FAQ faq) {
        FAQResponseDTO faqResponseDTO = new FAQResponseDTO();
        faqResponseDTO.setId(faq.getId());
        faqResponseDTO.setIsActive(faq.getIsActive());

        // Map wings
        List<FAQResponseDTO.WingDTO> wingDTOs = faq.getWings().stream().map(wing -> {
            FAQResponseDTO.WingDTO wingDTO = new FAQResponseDTO.WingDTO();
            wingDTO.setId(wing.getId());
            wingDTO.setWingsType(wing.getWingsType().name());

            // Map sections
            List<FAQResponseDTO.SectionDTO> sectionDTOs = wing.getSections().stream().map(section -> {
                FAQResponseDTO.SectionDTO sectionDTO = new FAQResponseDTO.SectionDTO();
                sectionDTO.setId(section.getId());
                sectionDTO.setTitle(section.getTitle());
                sectionDTO.setIsActive(section.getIsActive());

                // Map questions and answers
                List<FAQResponseDTO.QuestionAnswerDTO> questionDTOs = section.getQuestionAnswers().stream().map(question -> {
                    FAQResponseDTO.QuestionAnswerDTO questionDTO = new FAQResponseDTO.QuestionAnswerDTO();
                    questionDTO.setId(question.getId());
                    questionDTO.setQuestion(question.getQuestion());
                    questionDTO.setAnswer(question.getAnswer());
                    return questionDTO;
                }).toList();

                sectionDTO.setQuestions(questionDTOs);
                return sectionDTO;
            }).toList();

            wingDTO.setSections(sectionDTOs);
            return wingDTO;
        }).toList();

        faqResponseDTO.setWings(wingDTOs);
        return faqResponseDTO;
    }

    @Override
    public List<Section> getSectionByWing(Long id) {
        Wing wing = wingRepository.findById(id).get();
        return sectionRepository.findByWing(wing);
    }
}
