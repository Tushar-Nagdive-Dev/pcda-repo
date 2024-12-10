package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CFAQDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.FAQTableDataResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.SectionTableDataResponseDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;
import com.inn.pcda.pcdamanages.services.impl.FAQCollectionService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@Slf4j
@RestController
@RequestMapping("/api/faqdetails")
public class FAOController {

    @Autowired
    private IFAQDetailsService ifaqDetailsService;

    @Autowired
    private FAQCollectionService faqCollectionService;
    
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

    @GetMapping("/getSectionTable")
    public ResponseEntity<List<SectionTableDataResponseDTO>> getAllSections() {
        List<SectionTableDataResponseDTO> sections = ifaqDetailsService.getSectionForTable();
        return ResponseEntity.ok(sections);
    }

    @PutMapping("/updateTitle/{name}/{id}/{isActive}")
    public ResponseEntity<Section> updateSectionTitle(@PathVariable("name") String name, @PathVariable("id") Long id, @PathVariable("isActive") Boolean isActive) {
        Section updatedSection = ifaqDetailsService.updateSectionTitle(name, id, isActive);
        return ResponseEntity.ok(updatedSection);
    }

    @DeleteMapping("/section/{id}")
    public ResponseEntity<String> deleteSectionById(@PathVariable Long id) {
        ifaqDetailsService.deleteSectionById(id);
        return ResponseEntity.ok("Section with ID " + id + " has been deleted successfully.");
    }

    @GetMapping("/collections-with-points")
    public ResponseEntity<List<CFAQDTO>> getFAQCollectionsWithPoints() {
        List<CFAQDTO> faqCollections = faqCollectionService.getFAQCollectionsWithPoints();
        return ResponseEntity.ok(faqCollections);
    }
    
}
