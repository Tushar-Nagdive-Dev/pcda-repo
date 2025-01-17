package com.inn.pcda.users.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.users.dto.ResetPasswordResponseDTO;
import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.dto.TableResponseDTO;

import jakarta.servlet.http.HttpServletResponse;

public interface IFileProcessingRegistrationService {

	String processFile(MultipartFile file) throws IOException;

    List<ResponseRegistrationDTO> downloadAllDataAsJson();

    public List<TableResponseDTO> getOfficerList();

    public ResetPasswordResponseDTO getUserById(Long id);

    public void updatePassword(Long id, String newPassword);

    public void prepareAndWriteJsonResponse(String startDate, String endDate, HttpServletResponse response) throws IOException;
}
