package com.inn.pcda.pcdamanages.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.tableDTO.QuestionAnswerResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.UpdateQuestionRequestDTO;
import com.inn.pcda.pcdamanages.entity.QuestionAnswer;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.repos.QuestionAnswerRepository;
import com.inn.pcda.pcdamanages.repos.SectionRepository;
import com.inn.pcda.pcdamanages.repos.WingRepository;
import com.inn.pcda.pcdamanages.services.IQuestionAnswerService;

import jakarta.transaction.Transactional;
import lombok.Data;

@Service
public class QuestionAnswerServiceImpl implements IQuestionAnswerService{

    @Autowired
    private QuestionAnswerRepository questionAnswerRepository;

    @Autowired
    private WingRepository wingRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @Override
    public QuestionAnswerResponseDTO findById(Long id) {
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QuestionAnswer not found with id: " + id));

        // Map entity to response DTO
        QuestionAnswerResponseDTO response = new QuestionAnswerResponseDTO();
        response.setId(questionAnswer.getId());
        response.setFaqId(questionAnswer.getSection().getWing().getFaq().getId());
        response.setQuestion(questionAnswer.getQuestion());
        response.setAnswer(questionAnswer.getAnswer());
        response.setFaqStatus(questionAnswer.getSection().getIsActive());

        QuestionAnswerResponseDTO.WingResponse wingResponse = new QuestionAnswerResponseDTO.WingResponse();
        wingResponse.setId(questionAnswer.getSection().getWing().getId());
        wingResponse.setName(questionAnswer.getSection().getWing().getWingsType().name());
        response.setWing(wingResponse);

        QuestionAnswerResponseDTO.SectionResponse sectionResponse = new QuestionAnswerResponseDTO.SectionResponse();
        sectionResponse.setId(questionAnswer.getSection().getId());
        sectionResponse.setName(questionAnswer.getSection().getTitle());
        response.setSection(sectionResponse);

        response.setCreatedDate(questionAnswer.getCreatedDate());
        response.setUpdatedDate(questionAnswer.getUpdatedDate());

        return response;
    }

    @Override
    @Transactional
    public void updateFAQ(Long id, UpdateQuestionRequestDTO updateRequestDTO) {
        QuestionAnswer questionAnswer = questionAnswerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QuestionAnswer not found with id: " + id));

        Wing wing = wingRepository.findById(updateRequestDTO.getWingId())
                .orElseThrow(() -> new RuntimeException("Wing not found with id: " + updateRequestDTO.getWingId()));

        Section section = sectionRepository.findById(updateRequestDTO.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found with id: " + updateRequestDTO.getSectionId()));

        questionAnswer.setQuestion(updateRequestDTO.getQuestion());
        questionAnswer.setAnswer(updateRequestDTO.getAnswer());
        questionAnswer.setSection(section);
        // questionAnswer.setActive(updateRequestDTO.getIsActive());
        section.setWing(wing); // Ensure the section's wing is updated

        questionAnswerRepository.save(questionAnswer);
    }
    
}

