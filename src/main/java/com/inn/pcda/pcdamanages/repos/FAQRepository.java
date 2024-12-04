package com.inn.pcda.pcdamanages.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.FAQ;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long>{
    
}
