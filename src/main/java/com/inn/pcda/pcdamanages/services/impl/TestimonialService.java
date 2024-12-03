package com.inn.pcda.pcdamanages.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.repos.TestimonialRepo;
import com.inn.pcda.pcdamanages.services.ITestimonialService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestimonialService implements ITestimonialService {

    @Autowired
    private TestimonialRepo testmonialRepo;
    
    @Override
    public Testimonial addTestimonial(TestimonialDTO testimonialDTO) {
       log.info("Inside @class TestimonialService @method testimonialDTO : {}", testimonialDTO.toString());
        Testimonial testimonial = new Testimonial();
        testimonial.setImageId(testimonialDTO.getImageId());
        testimonial.setIsNew(testimonialDTO.getIsNew());
        testimonial.setName(testimonialDTO.getName());
        testimonial.setPosition(testimonialDTO.getPosition());
        testimonial.setStatus(testimonialDTO.getStatus());
        testimonial.setTestimonialBrief(testimonialDTO.getTestimonialBrief());
        return this.testmonialRepo.save(testimonial);
    }

    @Override
    public List<Testimonial> getAllTestimonials() {
        log.info("Inside @class TestimonialService @method getAllTestimonials");
        return this.testmonialRepo.findAll();
    }
    
}
