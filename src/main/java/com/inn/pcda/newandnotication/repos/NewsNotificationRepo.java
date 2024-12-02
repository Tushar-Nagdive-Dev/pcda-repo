package com.inn.pcda.newandnotication.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.newandnotication.entity.NewsAndNotification;

@Repository 
public interface NewsNotificationRepo extends JpaRepository<NewsAndNotification, Long>{
    
    @SuppressWarnings("null")
    public Optional<NewsAndNotification> findById(Long id);
}
