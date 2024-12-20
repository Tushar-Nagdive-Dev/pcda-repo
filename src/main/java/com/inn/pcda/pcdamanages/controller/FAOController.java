package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.FAQWithQuestionsDTO;
import com.inn.pcda.pcdamanages.dto.SectionDTO;
import com.inn.pcda.pcdamanages.dto.FAQColllectionDtos.CFAQDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.FAQTableDataResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.QuestionAnswerResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.SectionTableDataResponseDTO;
import com.inn.pcda.pcdamanages.dto.tableDTO.UpdateQuestionRequestDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;
import com.inn.pcda.pcdamanages.services.IQuestionAnswerService;
import com.inn.pcda.pcdamanages.services.impl.FAQCollectionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/faqdetails")
public class FAOController {

    @Autowired
    private IFAQDetailsService ifaqDetailsService;

    @Autowired
    private FAQCollectionService faqCollectionService;

    @Autowired
    private IQuestionAnswerService iQuestionAnswerService;

    @Operation(summary = "Add a new section", description = "Creates a new section in the system.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Section created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Section.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PostMapping("/addSection")
    public ResponseEntity<Section> addSection(@RequestBody SectionDTO sectionRequestDTO) {
        Section section = ifaqDetailsService.addSection(sectionRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(section);
    }

    @Operation(summary = "Add FAQ with questions and answers", description = "Creates a new FAQ with its related questions and answers.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "FAQ created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = FAQ.class))),
        @ApiResponse(responseCode = "400", description = "Invalid input data", content = @Content)
    })
    @PostMapping("/addWithQuestions")
    public ResponseEntity<FAQ> addFAQWithQuestionsAndAnswers(@Valid @RequestBody FAQWithQuestionsDTO faqWithQuestionsDTO) {
        FAQ createdFAQ = ifaqDetailsService.addFAQWithQuestionsAndAnswers(faqWithQuestionsDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFAQ);
    }

    @Operation(summary = "Get sections by wing ID", description = "Retrieves sections associated with a specific wing.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Sections retrieved successfully", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "404", description = "Wing not found", content = @Content)
    })
    @GetMapping("/byWing/{id}")
    public List<Section> getSectionListByWing(@PathVariable("id") Long id) {
        return ifaqDetailsService.getSectionByWing(id);
    }

    @Operation(summary = "Get FAQ table data", description = "Retrieves table data for all FAQs.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "FAQ table data retrieved successfully", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/getFaqTableData")
    public ResponseEntity<List<FAQTableDataResponseDTO>> getAllFAQDetails() {
        List<FAQTableDataResponseDTO> faqDetails = ifaqDetailsService.getFAQTableData();
        return ResponseEntity.ok(faqDetails);
    }

    @Operation(summary = "Get section table data", description = "Retrieves table data for all sections.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Section table data retrieved successfully", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/getSectionTable")
    public ResponseEntity<List<SectionTableDataResponseDTO>> getAllSections() {
        List<SectionTableDataResponseDTO> sections = ifaqDetailsService.getSectionForTable();
        return ResponseEntity.ok(sections);
    }

    @Operation(summary = "Update section title", description = "Updates the title of a section.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Section updated successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Section.class))),
        @ApiResponse(responseCode = "404", description = "Section not found", content = @Content)
    })
    @PutMapping("/updateTitle/{name}/{id}/{isActive}")
    public ResponseEntity<Section> updateSectionTitle(@PathVariable("name") String name, @PathVariable("id") Long id, @PathVariable("isActive") Boolean isActive) {
        Section updatedSection = ifaqDetailsService.updateSectionTitle(name, id, isActive);
        return ResponseEntity.ok(updatedSection);
    }

    @Operation(summary = "Delete section by ID", description = "Deletes a section using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Section deleted successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "Section not found", content = @Content)
    })
    @DeleteMapping("/section/{id}")
    public ResponseEntity<String> deleteSectionById(@PathVariable Long id) {
        ifaqDetailsService.deleteSectionById(id);
        return ResponseEntity.ok("Section with ID " + id + " has been deleted successfully.");
    }

    @Operation(summary = "Get FAQ collections with points", description = "Retrieves all FAQ collections with points.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "FAQ collections retrieved successfully", content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/collections-with-points")
    public ResponseEntity<List<CFAQDTO>> getFAQCollectionsWithPoints() {
        List<CFAQDTO> faqCollections = faqCollectionService.getFAQCollectionsWithPoints();
        return ResponseEntity.ok(faqCollections);
    }

    @Operation(summary = "Delete question by ID", description = "Deletes a question using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Question deleted successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "Question not found", content = @Content)
    })
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<String> deleteQuestionsById(@PathVariable Long id) {
        boolean isDeleted = ifaqDetailsService.deleteQuestionById(id);
        return isDeleted 
            ? ResponseEntity.ok("Question deleted successfully.")
            : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found.");
    }

    @Operation(summary = "Get FAQ details by ID", description = "Retrieves FAQ details using its ID.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "FAQ details retrieved successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = QuestionAnswerResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "FAQ not found", content = @Content)
    })
    @GetMapping("/faqTableDataById/{id}")
    public ResponseEntity<QuestionAnswerResponseDTO> getFaqTableDataById(@PathVariable Long id) {
        QuestionAnswerResponseDTO responseDTO = iQuestionAnswerService.findById(id);
        return ResponseEntity.ok(responseDTO);
    }

    @Operation(summary = "Update FAQ", description = "Updates an FAQ using its ID and request data.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "FAQ updated successfully", content = @Content),
        @ApiResponse(responseCode = "404", description = "FAQ not found", content = @Content)
    })
    @PutMapping("/questionUpdate/{id}")
    public ResponseEntity<String> updateFAQ(@PathVariable Long id, @RequestBody UpdateQuestionRequestDTO updateRequestDTO) {
        iQuestionAnswerService.updateFAQ(id, updateRequestDTO);
        return ResponseEntity.ok("FAQ updated successfully.");
    }
}
