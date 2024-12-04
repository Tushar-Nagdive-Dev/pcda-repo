package com.inn.pcda.newandnotication.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/news")
@Slf4j
public class NewsNofiticationController {

    @Autowired
    private INewsNotificationService iNewsNotificationService;
    
    
    @PostMapping()
    public ResponseEntity<NewsAndNotification> createNewsAndNotification(@RequestBody NewsNotificationDTO newsNotificationDTO) {
        log.info("Inside @class NewsNofiticationController @method createNewsAndNotification type : {}", newsNotificationDTO.getType());
        return ResponseEntity.ok(iNewsNotificationService.createNewsAndNotifications(newsNotificationDTO));
    }

    @GetMapping()
    public List<NewsAndNotification> getAllNewsAndNotifications() {
        return this.iNewsNotificationService.getAllNewsAndNotifications();
    }
    
    @DeleteMapping("/{id}")
    public Boolean deleteNewsAndNotificationbyId(@PathVariable("id") Long id) {
        log.info("Inside @class NewsNofiticationController @method deleteNewsAndNotificationbyId id: {}", id);
        return this.iNewsNotificationService.deleteNewsAndNotificationById(id);
    }

    @PutMapping("/{id}")
    public NewsAndNotification updateNewAndNotofication(@RequestBody NewsNotificationDTO newsNotificationDTO, @PathVariable("id") Long id) {
       return this.iNewsNotificationService.updateNewsAndNotification(newsNotificationDTO, id);
    }
}
