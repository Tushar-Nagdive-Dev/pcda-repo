package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.FAQDetailsDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;

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
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RestController
@RequestMapping("/api/faqdetails")
public class FAOController {

    @Autowired
    private IFAQDetailsService ifaqDetailsService;
    
    @PostMapping()
    public FAQ addFAQDetails(@RequestBody FAQDetailsDTO FAQdto) {
        return this.ifaqDetailsService.addFAQDetails(FAQdto);
    }

    @GetMapping()
    public List<FAQ> getAllFAQs() {
        return this.ifaqDetailsService.getAllFAQs();
    }
    
    /**
     * Updates FAQ details by ID.
     *
     * @param id the ID of the FAQ to update
     * @param faqDetailsDTO the DTO containing updated details
     * @return ResponseEntity with success or failure status
     */
    @PutMapping("/{id}")
    public ResponseEntity<Boolean> updateFAQDetails(
            @PathVariable("id") Long id,
            @RequestBody FAQDetailsDTO faqDetailsDTO) {
        log.info("Updating FAQ details for id: {}", id);
        Boolean isUpdated = ifaqDetailsService.updateFAQDetails(id, faqDetailsDTO);
        if (isUpdated) {
            return ResponseEntity.ok(true);
        } else {
            log.error("FAQ with id: {} not found or update failed", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }

    /**
     * Deletes an FAQ by ID.
     *
     * @param id the ID of the FAQ to delete
     * @return ResponseEntity with success or failure status
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteFAQbyId(@PathVariable("id") Long id) {
        log.info("Deleting FAQ for id: {}", id);
        Boolean isDeleted = ifaqDetailsService.deleteFAQbyId(id);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            log.error("FAQ with id: {} not found or deletion failed", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        }
    }
    
}
