package com.inn.pcda.pcdamanages.services;

import java.util.List;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;

public interface ITestimonialService {
    
    public Testimonial addTestimonial(TestimonialDTO testimonialDTO);

    public List<Testimonial> getAllTestimonials();
}
