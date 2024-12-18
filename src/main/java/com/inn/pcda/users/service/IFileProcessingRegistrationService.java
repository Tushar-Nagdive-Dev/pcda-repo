package com.inn.pcda.users.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.users.dto.ResponseRegistrationDTO;

public interface IFileProcessingRegistrationService {

	String processFile(MultipartFile file) throws IOException;
    List<ResponseRegistrationDTO> downloadAllDataAsJson();
}
