package com.inn.pcda.pcdamanages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.inn.pcda.pcdamanages.entity.FAQ;
import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.enums.WingsTypes;
import com.inn.pcda.pcdamanages.repos.FAQRepository;
import com.inn.pcda.pcdamanages.repos.WingRepository;

import jakarta.annotation.PostConstruct;

@Component
public class FAQInitializer {

    @Autowired
    private FAQRepository faqRepository;

    @Autowired
    private WingRepository wingRepository;

    @PostConstruct
    public void initializeDefaultFAQAndWings() {
        // Check if default FAQ exists
        if (faqRepository.count() == 0) {
            // Create default FAQ
            FAQ defaultFAQ = new FAQ();
            defaultFAQ.setIsActive(true);

            defaultFAQ = faqRepository.save(defaultFAQ); // Save FAQ first to get its ID

            // Add predefined wings to the default FAQ
            for (WingsTypes wingType : WingsTypes.values()) {
                Wing wing = new Wing();
                wing.setFaq(defaultFAQ);
                wing.setWingsType(wingType); // Use enum value
                wingRepository.save(wing); // Save each wing
            }

            System.out.println("Default FAQ and wings initialized.");
        } else {
            System.out.println("Default FAQ already exists.");
        }
    }
}
