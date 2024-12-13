package com.inn.pcda.newandnotication.services.impl;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.dto.NewsResponseDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.repos.NewsNotificationRepo;
import com.inn.pcda.newandnotication.services.INewsAndNotificationDocService;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NewsNotificationsService implements INewsNotificationService {

    @Autowired
    private NewsNotificationRepo newsNotificationRepo;

    @Autowired 
    private INewsAndNotificationDocService iNewsDocService;

    @Value("${document.base-url}") // Base URL for serving documents
    private String baseUrl;

    @Override
    public NewsAndNotification createNewsAndNotifications(NewsNotificationDTO newsNotificationDTO) {
        log.info("Inside @class NewsNotificationsService @method createNewsAndNotifications");

        if (newsNotificationDTO == null) {
            log.error("NewsNotificationDTO is null");
            return null;
        }

        NewsAndNotification newsAndNotification = new NewsAndNotification();
        newsAndNotification.setIsNew(newsNotificationDTO.getIsNew());
        newsAndNotification.setTitleEnglish(newsNotificationDTO.getTitleEnglish());
        newsAndNotification.setTitleHindi(newsNotificationDTO.getTitleHindi());
        newsAndNotification.setType(newsNotificationDTO.getType());
        newsAndNotification.setStatus(newsNotificationDTO.getStatus());
        newsAndNotification.setUiOrder(newsNotificationDTO.getUiOrder());

        return newsNotificationRepo.save(newsAndNotification);
    }

    @Override
    public List<NewsResponseDTO> getAllNewsAndNotifications() {
        log.info("Inside @class NewsNotificationsService @method getAllNewsAndNotifications");

        List<NewsAndNotification> notifications = newsNotificationRepo.findAll();
        return notifications.stream()
                .map(this::mapToDTO)
                .toList();
    }

    private NewsResponseDTO mapToDTO(NewsAndNotification entity) {
        String documentUrl = null;

        // Construct the downloadable document URL
        if (entity.getDocumentUrl() != null && !entity.getDocumentUrl().isEmpty()) {
            documentUrl = baseUrl + "news-and-notifications/" + entity.getDocumentUrl();
        }

        return new NewsResponseDTO(
                entity.getId(),
                entity.getTitleEnglish(),
                entity.getTitleHindi(),
                entity.getType(),
                entity.getStatus(),
                entity.getIsNew(),
                entity.getUiOrder(),
                documentUrl,
                entity.getCreatedDate(),
                entity.getUpdatedDate()
        );
    }

    @Override
    public Boolean deleteNewsAndNotificationById(Long id) {
        log.info("Inside @class NewsNotificationsService @method deleteNewsAndNotificationById : {}", id);

        if (id == null) {
            log.error("Provided ID is null");
            return false;
        }

        Optional<NewsAndNotification> optionalNews = newsNotificationRepo.findById(id);
        if (optionalNews.isPresent()) {
            newsNotificationRepo.deleteById(id);
            return true;
        } else {
            log.error("NewsAndNotification with id: {} not found", id);
            return false;
        }
    }

    @Transactional
    @Override
    public NewsAndNotification updateNewsAndNotification(NewsNotificationDTO newsNotificationDTO, Long id) {
        log.info("Inside @class NewsNotificationsService @method updateNewsAndNotification for id: {}", id);

        if (newsNotificationDTO == null || id == null) {
            log.error("Provided ID or NewsNotificationDTO is null");
            throw new IllegalArgumentException("Invalid input data");
        }

        Optional<NewsAndNotification> optionalNews = newsNotificationRepo.findById(id);
        if (optionalNews.isPresent()) {
            NewsAndNotification newsAndNotification = optionalNews.get();

            // Update fields
            newsAndNotification.setTitleEnglish(newsNotificationDTO.getTitleEnglish());
            newsAndNotification.setTitleHindi(newsNotificationDTO.getTitleHindi());
            newsAndNotification.setType(newsNotificationDTO.getType());
            newsAndNotification.setStatus(newsNotificationDTO.getStatus());
            newsAndNotification.setIsNew(newsNotificationDTO.getIsNew());
            newsAndNotification.setUiOrder(newsNotificationDTO.getUiOrder());

            return newsNotificationRepo.saveAndFlush(newsAndNotification);
        } else {
            log.error("NewsAndNotification with id: {} not found", id);
            throw new NoSuchElementException("NewsAndNotification not found");
        }
    }

    @Override
    public NewsAndNotification createNewsWithDocs(NewsNotificationDTO newsDto, MultipartFile file) {
        try {
            if(file != null) {
                String documentUrl = iNewsDocService.uploadFile(file);
                newsDto.setDocumentUrl(documentUrl);
            }

            NewsAndNotification newsAndNotification = new NewsAndNotification();
            newsAndNotification.setIsNew(newsDto.getIsNew());
            newsAndNotification.setDocumentUrl(newsDto.getDocumentUrl());
            newsAndNotification.setStatus(newsDto.getStatus());
            newsAndNotification.setTitleEnglish(newsDto.getTitleEnglish());
            newsAndNotification.setTitleHindi(newsDto.getTitleHindi());
            newsAndNotification.setType(newsDto.getType());
            newsAndNotification.setUiOrder(newsDto.getUiOrder());
            return newsNotificationRepo.save(newsAndNotification);
        } catch (Exception e) {
            throw new NoSuchElementException("NewsAndNotification not found");
        }
    }

    @Override
    public NewsAndNotification updateNewsWithDocs(NewsNotificationDTO newsNotificationDTO, Long id, MultipartFile file) throws IOException {
        try {
            String documentUrl = "";
            if (file != null) {
                documentUrl = iNewsDocService.uploadFile(file);
            }
            NewsAndNotification existingNews = newsNotificationRepo.findById(id).orElseThrow(() -> new RuntimeException("NewsAndNotification not found"));
            existingNews.setTitleEnglish(newsNotificationDTO.getTitleEnglish());
            existingNews.setTitleHindi(newsNotificationDTO.getTitleHindi());
            existingNews.setStatus(newsNotificationDTO.getStatus());
            existingNews.setType(newsNotificationDTO.getType());
            existingNews.setUiOrder(newsNotificationDTO.getUiOrder());
            if(!documentUrl.isEmpty())
                existingNews.setDocumentUrl(documentUrl);
                
            return newsNotificationRepo.save(existingNews);
        } catch (IOException e) {
            log.error("Error occured inside @class NewsNotificationService", e);
            return null;
        }
    }

}
