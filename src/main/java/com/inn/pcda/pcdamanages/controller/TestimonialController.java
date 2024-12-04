package com.inn.pcda.pcdamanages.controller;

import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;
import com.inn.pcda.pcdamanages.services.ITestimonialService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@RestController
@RequestMapping("/api/testimonial")
public class TestimonialController {

    @Autowired
    private ITestimonialService iTestimonialService;
    
    @PostMapping()
    public Testimonial addTestimonial(@RequestBody TestimonialDTO testimonialDTO) {
        log.info("Inside @class TestimonialController @method addTestimonial : {}", testimonialDTO.toString());
        return iTestimonialService.addTestimonial(testimonialDTO);
    }

    @GetMapping()
    public List<Testimonial> getAllTestimonials() {
        log.info("Inside @class TestimonialController @method getAllTestimonials");
        return iTestimonialService.getAllTestimonials();
    }

    // @PostMapping("/{id}")
    // public String updateTestimonials(@RequestBody TestimonialDTO testimonialDTO, @PathVariable("id") Long id) {
        
    // }
    
    
}
