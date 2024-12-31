package com.inn.pcda.users.service.impl;

import java.util.List;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.entity.RegisterUserJsonFileMetadata;
import com.inn.pcda.users.entity.RegisterUserJsonFileMetadata.Status;
import com.inn.pcda.users.repository.RegisterUserJsonFileMetaRepository;
import com.inn.pcda.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class AsyncFileProcessingService {
    
    private final RegisterUserJsonFileMetaRepository registerUserJsonFileMetaRepository;

    private final UserRepository userRepository;

    @Async
    public void processLargeFileAsync(String fileName, Long fileId, List<RegistrationRequestDTO> records) {
        log.info("Started async processing for file: {}", fileName);
        RegisterUserJsonFileMetadata metadata = registerUserJsonFileMetaRepository.findById(fileId).orElseThrow(() -> new RuntimeException("JSON file not present"));
        Integer processRecords = 0;

        for(RegistrationRequestDTO record: records) {
            try {
                processRecords++;
                metadata.setProcessedRecords(processRecords);
                registerUserJsonFileMetaRepository.save(metadata);
            } catch (Exception e) {
                log.error("Error processing record: {}", record, e);
            }
        }

        metadata.setStatus(Status.Complete);
        registerUserJsonFileMetaRepository.save(metadata);

        log.info("Completed async processing for file: {}", fileName);
    }
}
