package com.inn.pcda.newandnotication.services.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.repos.NewsNotificationRepo;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NewsNotificationsService implements INewsNotificationService {

    @Autowired
    private NewsNotificationRepo newsNotificationRepo;

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
    public List<NewsAndNotification> getAllNewsAndNotifications() {
        log.info("Inside @class NewsNotificationsService @method getAllNewsAndNotifications");
        return newsNotificationRepo.findAll();
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

}
