package com.inn.pcda.newandnotication.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;



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
    
    @DeleteMapping()
    public Boolean deleteNewsAndNotificationbyId(@PathParam("id") Long id) {
        log.info("Inside @class NewsNofiticationController @method deleteNewsAndNotificationbyId id: {}", id);
        return this.iNewsNotificationService.deleteNewsAndNotificationById(id);
    }
}
