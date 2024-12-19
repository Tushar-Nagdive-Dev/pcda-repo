package com.inn.pcda.downloadmanager.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.downloadmanager.dto.AddDocDto;
import com.inn.pcda.downloadmanager.dto.ResponseDto;
import com.inn.pcda.downloadmanager.dto.UpdateDocDto;
import com.inn.pcda.downloadmanager.entity.DocDownload;
import com.inn.pcda.downloadmanager.repo.DocDownloadRepository;
import com.inn.pcda.downloadmanager.services.IDocDownloadService;
import com.inn.pcda.exceptions.DocumentServiceException;
import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.repos.WingRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class DocDownloadService implements IDocDownloadService{
    
    private static final String UPLOAD_DIR = "documents/uploads/";

    @Value("${document.base-url}") // Base URL for serving documents
    private String baseUrl;

    
    private final DocDownloadRepository docDownloadRepository;

    private final WingRepository wingRepo;

    @Override
    public DocDownload addDocument(AddDocDto dto, MultipartFile file) {
        try {
            final Wing wing = wingRepo.findById(dto.getWingId())
                .orElseThrow(() -> new RuntimeException(String.format("Wing not found with ID: %d", dto.getWingId())));

            final Path filePath = saveFile(file);

            DocDownload docDownload = new DocDownload();
            docDownload.setTitle(dto.getTitle());
            docDownload.setTitleInHindi(dto.getTitleInHindi());
            docDownload.setDocumentPath(filePath.toString());
            docDownload.setStatus(dto.getStatus());
            docDownload.setUiOrder(dto.getUiOrder());
            docDownload.setWing(wing);

            return docDownloadRepository.save(docDownload);
        } catch (IOException e) {
            log.error("Error occurred while saving document for Wing ID: {}", dto.getWingId(), e);
            throw new DocumentServiceException("Unable to save document", e);
        }
    }

    private Path saveFile(MultipartFile file) throws IOException {
        final Path uploadDirPath = ensureUploadDirExists();
        final String uniqueFilename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        final Path filePath = uploadDirPath.resolve(uniqueFilename);
        Files.write(filePath, file.getBytes());
        return filePath;
    }

    private Path ensureUploadDirExists() throws IOException {
        final Path uploadDirPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadDirPath)) {
            Files.createDirectories(uploadDirPath);
        }
        return uploadDirPath;
    }

    @Override
    public Boolean updateDocument(Long id, UpdateDocDto dto, MultipartFile file) {
        try {
            final DocDownload docDownload = docDownloadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Document record not found for ID: %d", id)));
            
            final Wing wing = wingRepo.findById(dto.getWingId())
                .orElseThrow(() -> new RuntimeException(String.format("Wing not found with ID: %d", dto.getWingId())));

            
            if (dto.getTitle() != null) docDownload.setTitle(dto.getTitle());
            if (dto.getTitleInHindi() != null) docDownload.setTitleInHindi(dto.getTitleInHindi());
            if (dto.getStatus() != null) docDownload.setStatus(dto.getStatus());
            if (dto.getUiOrder() != null) docDownload.setUiOrder(dto.getUiOrder());
            if (dto.getWingId() != null) docDownload.setWing(wing);

            if (file != null) {
                final Path filePath = saveFile(file);
                docDownload.setDocumentPath(filePath.toString());
            }

            docDownloadRepository.save(docDownload);
            return true;
        } catch (IOException e) {
            log.error("Error occurred while updating document with ID: {}", id, e);
            throw new DocumentServiceException("Unable to update document", e);
        }
    }

    @Override
    public ResponseDto getDocumentDetails(Long id) {
        Optional<DocDownload> optionalDocDownload = docDownloadRepository.findById(id);
        ResponseDto dto = new ResponseDto();
        if (optionalDocDownload.isEmpty()) {
            throw new RuntimeException("Document not found");
        }
        dto.setId(optionalDocDownload.get().getId());
        dto.setCreatedDate(optionalDocDownload.get().getCreatedDate());
        dto.setDocumentPath(optionalDocDownload.get().getDocumentPath());
        dto.setStatus(optionalDocDownload.get().getStatus());
        dto.setTitle(optionalDocDownload.get().getTitle());
        dto.setTitleInHindi(optionalDocDownload.get().getTitleInHindi());
        dto.setUiOrder(optionalDocDownload.get().getUiOrder());
        dto.setUpdatedDate(optionalDocDownload.get().getUpdatedDate());
        dto.setWingId(optionalDocDownload.get().getWing().getId());
        
        return dto;
    }

    @Override
    public Boolean deleteDocument(@PathVariable Long id) throws IOException {
        Optional<DocDownload> optionalDocDownload = docDownloadRepository.findById(id);

        if (optionalDocDownload.isEmpty()) {
            throw new RuntimeException("Document record not found");
        }

        DocDownload docDownload = optionalDocDownload.get();
        Path filePath = Paths.get(docDownload.getDocumentPath());

        try {
            // Delete the file locally
            if (Files.exists(filePath)) {
                Files.delete(filePath);
            }

            // Delete the record from the database
            docDownloadRepository.delete(docDownload);

            return true;
        } catch (IOException e) {
            log.error("Error Occured Inside @class DocDownloadService @method deleteDocument ", e);
            throw new IOException(e.getMessage());
        }
    }

    @Override
    public Resource downloadDocumentAsResource(Long id) {
        Optional<DocDownload> optionalDocDownload = docDownloadRepository.findById(id);
        if (optionalDocDownload.isEmpty()) {
            throw new RuntimeException("Document not found");
        }

        DocDownload docDownload = optionalDocDownload.get();
        Path filePath = Paths.get(docDownload.getDocumentPath());

        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("File not found or not readable");
            }
        } catch (Exception e) {
            log.error("Error occurred while accessing the file", e);
            throw new RuntimeException("Error occurred while accessing the file");
        }
    }


    @Override
    public List<ResponseDto> getAllDocuments() {
        List<DocDownload> documents = docDownloadRepository.findAll();
        return documents.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private ResponseDto mapToDto(DocDownload doc) {
        ResponseDto dto = new ResponseDto();
        dto.setId(doc.getId());
        dto.setTitle(doc.getTitle());
        dto.setTitleInHindi(doc.getTitleInHindi());
        dto.setDocumentPath(buildDocumentUrl(doc.getDocumentPath())); // Include the computed URL
        dto.setStatus(doc.getStatus());
        dto.setUiOrder(doc.getUiOrder());
        dto.setCreatedDate(doc.getCreatedDate());
        dto.setUpdatedDate(doc.getUpdatedDate());
        dto.setWingId(doc.getWing().getId());
        return dto;
    }

    private String buildDocumentUrl(String documentPath) {
        return baseUrl +"doc-download/"+ documentPath; // Replace with your base URL logic
    }

}


