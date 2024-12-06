package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.FAQTableDataResponseDTO;
import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@Slf4j
@RestController
@RequestMapping("/api/faqdetails")
public class FAOController {

    @Autowired
    private IFAQDetailsService ifaqDetailsService;
    
    @PostMapping("/addSection")
    public ResponseEntity<Section> addSection(@RequestBody SectionDTO sectionRequestDTO) {
        Section section = ifaqDetailsService.addSection(sectionRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(section);
    }
    
    @PostMapping("/addWithQuestions")
    public ResponseEntity<FAQ> addFAQWithQuestionsAndAnswers(@Valid @RequestBody FAQWithQuestionsDTO faqWithQuestionsDTO) {
        FAQ createdFAQ = ifaqDetailsService.addFAQWithQuestionsAndAnswers(faqWithQuestionsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFAQ);
    }

    @GetMapping("/byWing/{id}")
    public List<Section> getSectionListByWing(@PathVariable("id") Long id) {
        return ifaqDetailsService.getSectionByWing(id);
    }
    
    @GetMapping("/getFaqTableData")
    public ResponseEntity<List<FAQTableDataResponseDTO>> getAllFAQDetails() {
        List<FAQTableDataResponseDTO> faqDetails = ifaqDetailsService.getFAQTableData();
        return ResponseEntity.ok(faqDetails);
    }
}
