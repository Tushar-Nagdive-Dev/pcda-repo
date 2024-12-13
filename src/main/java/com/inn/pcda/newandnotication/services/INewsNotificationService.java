package com.inn.pcda.newandnotication.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.newandnotication.dto.NewsNotificationDTO;
import com.inn.pcda.newandnotication.dto.NewsResponseDTO;
import com.inn.pcda.newandnotication.entity.NewsAndNotification;

public interface INewsNotificationService {
    
    public NewsAndNotification createNewsAndNotifications(NewsNotificationDTO newsNotificationDTO);

    public List<NewsResponseDTO> getAllNewsAndNotifications();

    public Boolean deleteNewsAndNotificationById(Long id);

    public NewsAndNotification updateNewsAndNotification(NewsNotificationDTO newsNotificationDTO,Long id);

    public NewsAndNotification createNewsWithDocs(NewsNotificationDTO newsDto, MultipartFile file);

    public NewsAndNotification updateNewsWithDocs(NewsNotificationDTO newsNotificationDTO, Long id, MultipartFile file) throws IOException;
}
