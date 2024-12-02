package com.inn.pcda.newandnotication.services;

import java.util.List;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;

public interface INewsNotificationService {
    
    public NewsAndNotification createNewsAndNotifications(NewsNotificationDTO newsNotificationDTO);

    public List<NewsAndNotification> getAllNewsAndNotifications();

    public Boolean deleteNewsAndNotificationById(Long id);
}
