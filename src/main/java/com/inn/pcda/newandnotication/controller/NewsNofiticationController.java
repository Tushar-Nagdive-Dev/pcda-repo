package com.inn.pcda.newandnotication.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/news")
@Slf4j
public class NewsNofiticationController {

    @Autowired
    private INewsNotificationService iNewsNotificationService;

    @PostMapping
    public ResponseEntity<?> createNewsAndNotification(@RequestBody NewsNotificationDTO newsNotificationDTO) {
        log.info("Inside @class NewsNofiticationController @method createNewsAndNotification");
        
        if (newsNotificationDTO == null) {
            return ResponseEntity.badRequest().body("NewsNotificationDTO is null");
        }

        NewsAndNotification createdNews = iNewsNotificationService.createNewsAndNotifications(newsNotificationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNews);
    }

    @GetMapping
    public ResponseEntity<List<NewsAndNotification>> getAllNewsAndNotifications() {
        log.info("Inside @class NewsNofiticationController @method getAllNewsAndNotifications");

        List<NewsAndNotification> newsList = iNewsNotificationService.getAllNewsAndNotifications();
        if (newsList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(newsList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNewsAndNotificationById(@PathVariable("id") Long id) {
        log.info("Inside @class NewsNofiticationController @method deleteNewsAndNotificationById : {}", id);

        Boolean isDeleted = iNewsNotificationService.deleteNewsAndNotificationById(id);
        if (isDeleted) {
            return ResponseEntity.ok("NewsAndNotification deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("NewsAndNotification with id: " + id + " not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNewAndNotification(
            @RequestBody NewsNotificationDTO newsNotificationDTO,
            @PathVariable("id") Long id) {
        log.info("Inside @class NewsNofiticationController @method updateNewAndNotification for id: {}", id);

        if (newsNotificationDTO == null) {
            return ResponseEntity.badRequest().body("NewsNotificationDTO is null");
        }

        NewsAndNotification updatedNews = iNewsNotificationService.updateNewsAndNotification(newsNotificationDTO, id);
        if (updatedNews != null) {
            return ResponseEntity.ok(updatedNews);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("NewsAndNotification with id: " + id + " not found");
        }
    }

    /* 
     * APIs for docs
     */
    @PostMapping("/withDocs")
    public ResponseEntity<NewsAndNotification> createNewsWithDocs(@RequestPart("news") NewsNotificationDTO newsDto, @RequestPart(value = "file", required = false) MultipartFile file) {
        return ResponseEntity.ok(iNewsNotificationService.createNewsWithDocs(newsDto, file));
    }

    @PutMapping("withDocs/{id}")
    public ResponseEntity<NewsAndNotification> updateNewsWithDocs(@PathVariable Long id, @RequestPart("news") NewsNotificationDTO news, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(iNewsNotificationService.updateNewsWithDocs(news, id, file));
    }
    
}
