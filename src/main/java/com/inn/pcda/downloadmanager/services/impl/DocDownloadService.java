package com.inn.pcda.downloadmanager.services.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.downloadmanager.dto.AddDocDto;
import com.inn.pcda.downloadmanager.dto.UpdateDocDto;
import com.inn.pcda.downloadmanager.entity.DocDownload;
import com.inn.pcda.downloadmanager.repo.DocDownloadRepository;
import com.inn.pcda.downloadmanager.services.IDocDownloadService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DocDownloadService implements IDocDownloadService{
    
    private static final String UPLOAD_DIR = "documents/uploads/";

    @Value("${document.base-url}") // Base URL for serving documents
    private String baseUrl;

    @Autowired
    private DocDownloadRepository docDownloadRepository;

    @Override
    public DocDownload addDocument(AddDocDto dto, MultipartFile file) throws Exception{
        try {
            Path uploadDirPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadDirPath)) {
                Files.createDirectories(uploadDirPath);
            }

            // Save the file locally
            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
            Path filePath = uploadDirPath.resolve(uniqueFilename);
            Files.write(filePath, file.getBytes());

            DocDownload docDownload = new DocDownload();
            docDownload.setTitle(dto.getTitle());
            docDownload.setTitleInHindi(dto.getTitleInHindi());
            docDownload.setDocumentPath(filePath.toString());
            docDownload.setStatus(dto.getStatus());
            docDownload.setUiOrder(dto.getUiOrder());

            return docDownloadRepository.save(docDownload);
        } catch (Exception e) {
            log.error("Error Occured inside class DocDownloadService method addDocument ", e);
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public Boolean updateDocument(Long id,UpdateDocDto dto, MultipartFile file) throws Exception {
       try {

        Optional<DocDownload> optionalDocDownload = docDownloadRepository.findById(id);
        if (optionalDocDownload.isEmpty()) {
                throw new RuntimeException("Document record not found");
        }

        DocDownload docDownload = optionalDocDownload.get();
        if (dto.getTitle() != null) docDownload.setTitle(dto.getTitle());
        if (dto.getTitleInHindi() != null) docDownload.setTitleInHindi(dto.getTitleInHindi());
        if (dto.getStatus() != null) docDownload.setStatus(dto.getStatus());
        if (dto.getUiOrder() != null) docDownload.setUiOrder(dto.getUiOrder());

        if (file != null) {
            // Ensure the upload directory exists
            Path uploadDirPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadDirPath)) {
                Files.createDirectories(uploadDirPath);
            }

            // Save the new file locally
            String originalFilename = file.getOriginalFilename();
            String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
            Path filePath = uploadDirPath.resolve(uniqueFilename);
            Files.write(filePath, file.getBytes());
            docDownload.setDocumentPath(filePath.toString());
        }

        docDownloadRepository.save(docDownload);
        return true;
       } catch (Exception e) {
        log.error("Error Occured inside class DocDownloadService method updateDocument ", e);
        throw new Exception(e.getMessage());
       }
    }

    @Override
    public DocDownload getDocumentDetails(Long id) {
        Optional<DocDownload> optionalDocDownload = docDownloadRepository.findById(id);
        if (optionalDocDownload.isEmpty()) {
            throw new RuntimeException("Document not found");
        }
        return optionalDocDownload.get();
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
    public List<DocDownload> getAllDocuments() {
        List<DocDownload> documents = docDownloadRepository.findAll();
        return documents.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private DocDownload mapToDto(DocDownload doc) {
        DocDownload dto = new DocDownload();
        dto.setId(doc.getId());
        dto.setTitle(doc.getTitle());
        dto.setTitleInHindi(doc.getTitleInHindi());
        dto.setDocumentPath(buildDocumentUrl(doc.getDocumentPath())); // Include the computed URL
        dto.setStatus(doc.getStatus());
        dto.setUiOrder(doc.getUiOrder());
        dto.setCreatedDate(doc.getCreatedDate());
        dto.setUpdatedDate(doc.getUpdatedDate());
        return dto;
    }

    private String buildDocumentUrl(String documentPath) {
        return baseUrl +"doc-download/"+ documentPath; // Replace with your base URL logic
    }

}


