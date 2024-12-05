package com.inn.pcda.pcdamanages.repos;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.FAQ;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long>{
    
    @Query("SELECT DISTINCT f FROM FAQ f JOIN FETCH f.wings w JOIN FETCH w.sections s JOIN FETCH s.questionAnswers q")
    public List<FAQ> findAllWithDetails();
}
