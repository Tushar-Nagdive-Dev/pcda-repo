package com.inn.pcda.common.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {
    
    public List<Integer> storeFiles(MultipartFile[] files);
}
