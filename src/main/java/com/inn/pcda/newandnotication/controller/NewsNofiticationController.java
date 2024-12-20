package com.inn.pcda.newandnotication.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.dto.NewsResponseDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/news")
@Slf4j
public class NewsNofiticationController {

    @Autowired
    private INewsNotificationService iNewsNotificationService;

    @Operation(
            summary = "Create News and Notification",
            description = "Creates a new News and Notification entry using the provided data."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "News and Notification created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping
    public ResponseEntity<?> createNewsAndNotification(@RequestBody NewsNotificationDTO newsNotificationDTO) {
        log.info("Inside @class NewsNofiticationController @method createNewsAndNotification");
        
        if (newsNotificationDTO == null) {
            return ResponseEntity.badRequest().body("NewsNotificationDTO is null");
        }

        NewsAndNotification createdNews = iNewsNotificationService.createNewsAndNotifications(newsNotificationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNews);
    }

    @Operation(
            summary = "Get All News and Notifications",
            description = "Retrieves a list of all News and Notification entries."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of News and Notifications retrieved successfully"),
            @ApiResponse(responseCode = "204", description = "No News and Notifications found")
    })
    @GetMapping
    public ResponseEntity<List<NewsResponseDTO>> getAllNewsAndNotifications() {
        log.info("Inside @class NewsNofiticationController @method getAllNewsAndNotifications");

        List<NewsResponseDTO> newsList = iNewsNotificationService.getAllNewsAndNotifications();
        if (newsList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(newsList);
    }

    @Operation(
            summary = "Delete News and Notification by ID",
            description = "Deletes a News and Notification entry by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "News and Notification deleted successfully"),
            @ApiResponse(responseCode = "404", description = "News and Notification not found")
    })
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

    @Operation(
            summary = "Update News and Notification",
            description = "Updates an existing News and Notification entry by ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "News and Notification updated successfully"),
            @ApiResponse(responseCode = "404", description = "News and Notification not found")
    })
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

    @Operation(
            summary = "Create News and Notification with Document",
            description = "Creates a new News and Notification entry with an optional document."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "News and Notification created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data")
    })
    @PostMapping("/withDocs")
    public ResponseEntity<NewsAndNotification> createNewsWithDocs(
            @RequestPart("news") NewsNotificationDTO newsDto, 
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ResponseEntity.ok(iNewsNotificationService.createNewsWithDocs(newsDto, file));
    }

    @Operation(
            summary = "Update News and Notification with Document",
            description = "Updates an existing News and Notification entry by ID with an optional document."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "News and Notification updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "404", description = "News and Notification not found")
    })
    @PutMapping("withDocs/{id}")
    public ResponseEntity<NewsAndNotification> updateNewsWithDocs(
            @PathVariable Long id, 
            @RequestPart("news") NewsNotificationDTO news, 
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return ResponseEntity.ok(iNewsNotificationService.updateNewsWithDocs(news, id, file));
    }
}
