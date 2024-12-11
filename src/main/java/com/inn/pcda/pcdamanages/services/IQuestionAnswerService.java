package com.inn.pcda.pcdamanages.services;

import com.inn.pcda.pcdamanages.dto.tableDTO.QuestionAnswerResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.UpdateQuestionRequestDTO;

public interface IQuestionAnswerService {

    public QuestionAnswerResponseDTO findById(Long id);
    public void updateFAQ(Long id, UpdateQuestionRequestDTO updateRequestDTO);
}

