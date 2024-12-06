package com.inn.pcda.pcdamanages.services;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.pcdamanages.dto.TestimonialDTO;
import com.inn.pcda.pcdamanages.entity.Testimonial;

public interface ITestimonialService {
    
    public Testimonial addTestimonial(TestimonialDTO testimonialDTO);

    public List<Testimonial> getAllTestimonials();

    public Integer uploadProfileImage(Long id, MultipartFile file);

    public Testimonial updateTestimonial(TestimonialDTO testimonialDTO, Long id);

    public Boolean deleteTestimonialById(Long id);

    public Testimonial uploadTestimonialWithImage(Testimonial testimonialData, MultipartFile file);

    public Testimonial getTestimonialById(Long id);
}
