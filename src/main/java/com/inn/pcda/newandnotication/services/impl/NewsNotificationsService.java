package com.inn.pcda.newandnotication.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;
import com.inn.pcda.newandnotication.repos.NewsNotificationRepo;
import com.inn.pcda.newandnotication.services.INewsNotificationService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NewsNotificationsService implements INewsNotificationService{

    @Autowired
    private NewsNotificationRepo newsNotificationRepo;

    @Override
    public NewsAndNotification createNewsAndNotifications(NewsNotificationDTO newsNotificationDTO) {
        log.info("Inside @class NewsNotificationsService @method createNewsAndNotifications");
        if(newsNotificationDTO != null) {
            NewsAndNotification newsAndNotification = new NewsAndNotification();
            newsAndNotification.setIsNew(newsNotificationDTO.getIsNew());
            newsAndNotification.setTitleEnglish(newsNotificationDTO.getTitleEnglish());
            newsAndNotification.setTitleHindi(newsNotificationDTO.getTitleHindi());
            newsAndNotification.setType(newsNotificationDTO.getType());
            newsAndNotification.setStatus(newsNotificationDTO.getStatus());
            newsAndNotification.setUiOrder(newsNotificationDTO.getUiOrder());
            return this.newsNotificationRepo.save(newsAndNotification);
        }
        return null;
    }

    @Override
    public List<NewsAndNotification> getAllNewsAndNotifications() {
        log.info("Inside @class NewsNotificationsService @method getAllNewsAndNotifications");
        return this.newsNotificationRepo.findAll();
    }

    @Override
    public Boolean deleteNewsAndNotificationById(Long id) {
        log.info("Inside @class NewsNotificationsService @method deleteNewsAndNotificationById : {}", id);
        this.newsNotificationRepo.deleteById(id);
        return true;
    }
    
}
