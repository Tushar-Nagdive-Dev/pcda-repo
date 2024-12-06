package com.inn.pcda.pcdamanages.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;

public interface ITestimonialService {
    
    public Testimonial addTestimonial(TestimonialDTO testimonialDTO);

    public Boolean deleteTestimonialById(Long id);

    public Testimonial uploadTestimonialWithImage(Testimonial testimonialData, MultipartFile file);

    public Testimonial createTestimonialWithImage(TestimonialDTO testimonialDTO, MultipartFile file);

    List<TestimonialDTO> getAllTestimonials();

    Testimonial updateTestimonialWithImage(Long id, TestimonialDTO testimonialDTO, MultipartFile file);

    TestimonialDTO getTestimonialById(Long id);



}
