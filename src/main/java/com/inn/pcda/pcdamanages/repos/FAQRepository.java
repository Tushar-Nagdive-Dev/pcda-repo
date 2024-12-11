package com.inn.pcda.pcdamanages.repos;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.FAQ;

@Repository
public interface FAQRepository extends JpaRepository<FAQ, Long>{

    @EntityGraph(attributePaths = {"wings.sections.questionAnswers"})
    Optional<FAQ> findById(Long id);
    
    @Query("""
        SELECT DISTINCT f 
        FROM FAQ f
        LEFT JOIN FETCH f.wings w
        LEFT JOIN FETCH w.sections s
        LEFT JOIN FETCH s.questionAnswers q
        """)
    List<FAQ> findAllWithDetails();

    @Query("""
        SELECT DISTINCT f 
        FROM FAQ f
        LEFT JOIN FETCH f.wings w
        LEFT JOIN FETCH w.sections s
        LEFT JOIN FETCH s.questionAnswers 
        WHERE f.isActive = true OR f.isActive=false
        """)
    List<FAQ> findFAQWithHierarchy();

}
