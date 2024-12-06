package com.inn.pcda.pcdamanages.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.QuestionAnswer;

@Repository
public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {
    
    @Query("SELECT qa FROM QuestionAnswer qa JOIN FETCH qa.section s JOIN FETCH s.wing w JOIN FETCH w.faq f")
    List<QuestionAnswer> findAllWithDetails();
}
