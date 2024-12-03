package com.inn.pcda.pcdamanages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.Testimonial;

@Repository
public interface TestimonialRepo extends JpaRepository<Testimonial, Long>{
    
}
