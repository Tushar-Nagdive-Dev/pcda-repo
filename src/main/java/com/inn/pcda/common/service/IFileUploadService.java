package com.inn.pcda.common.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IFileUploadService {
    
    public Integer saveFile(MultipartFile file) throws IOException;
}
