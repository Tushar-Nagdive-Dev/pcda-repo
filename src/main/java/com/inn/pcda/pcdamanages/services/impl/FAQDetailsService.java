package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.FAQDetailsDTO;
import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.repos.FAQRepository;
import com.inn.pcda.pcdamanages.services.IFAQDetailsService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FAQDetailsService implements IFAQDetailsService{

    @Autowired
    private FAQRepository faqRepo;

    @Override
    public FAQ addFAQDetails(FAQDetailsDTO faqDetailsDTO) {
        FAQ faq = new FAQ();
        faq.setAnswers(faqDetailsDTO.getAnswers());
        faq.setIsActive(faqDetailsDTO.getIsActive());
        faq.setQuestion(faqDetailsDTO.getQuestion());
        faq.setWings(faqDetailsDTO.getWings());
        faq.setSections(faqDetailsDTO.getSections());
        return this.faqRepo.save(faq);
    }

    @Override
    public List<FAQ> getAllFAQs() {
        return faqRepo.findAll();
    }

    @Override
    public Boolean updateFAQDetails(Long id, FAQDetailsDTO faqDetailsDTO) {
        log.info("Updating FAQ details for id: {}", id);

        if (faqDetailsDTO == null || id == null) {
            log.error("FAQDetailsDTO or ID is null");
            return false;
        }

        Optional<FAQ> optionalFAQ = faqRepo.findById(id);

        if (optionalFAQ.isPresent()) {
            FAQ faq = optionalFAQ.get();
            faq.setWings(faqDetailsDTO.getWings());
            faq.setSections(faqDetailsDTO.getSections());
            faq.setQuestion(faqDetailsDTO.getQuestion());
            faq.setAnswers(faqDetailsDTO.getAnswers());
            faq.setIsActive(faqDetailsDTO.getIsActive());

            faqRepo.save(faq);
            log.info("FAQ details updated successfully for id: {}", id);
            return true;
        } else {
            log.error("FAQ with id: {} not found", id);
            return false;
        }
    }

    @Override
    public Boolean deleteFAQbyId(Long id) {
        log.info("Deleting FAQ by id: {}", id);

        if (id == null) {
            log.error("Provided ID is null");
            return false;
        }

        Optional<FAQ> optionalFAQ = faqRepo.findById(id);

        if (optionalFAQ.isPresent()) {
            faqRepo.deleteById(id);
            log.info("Successfully deleted FAQ with id: {}", id);
            return true;
        } else {
            log.error("FAQ with id: {} not found");
            return false;
        }
    }

    
}
