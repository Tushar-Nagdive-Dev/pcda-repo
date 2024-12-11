package com.inn.pcda.newandnotication.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface INewsAndNotificationDocService {

    public String uploadFile(MultipartFile file) throws IOException;
    
}
