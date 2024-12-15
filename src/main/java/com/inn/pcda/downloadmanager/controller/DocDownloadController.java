package com.inn.pcda.downloadmanager.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.downloadmanager.dto.AddDocDto;
import com.inn.pcda.downloadmanager.dto.UpdateDocDto;
import com.inn.pcda.downloadmanager.entity.DocDownload;
import com.inn.pcda.downloadmanager.services.IDocDownloadService;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/document")
public class DocDownloadController {

    private final IDocDownloadService docDownloadService;

    public DocDownloadController(IDocDownloadService docDownloadService) {
        this.docDownloadService = docDownloadService;
    }

    @PostMapping
    public ResponseEntity<DocDownload> addDocument(@ModelAttribute AddDocDto dto, @RequestParam("file") MultipartFile file) {
        try {
            DocDownload docDownload = docDownloadService.addDocument(dto, file);
            return ResponseEntity.ok(docDownload);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateDocument(@PathVariable Long id, @ModelAttribute UpdateDocDto dto, @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            if (docDownloadService.updateDocument(id, dto, file)) {
                return ResponseEntity.ok("Document updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Document update failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            if (docDownloadService.deleteDocument(id)) {
                return ResponseEntity.ok("Document deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Document deletion failed");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocDownload> getDocumentDetails(@PathVariable Long id) {
        try {
            DocDownload docDownload = docDownloadService.getDocumentDetails(id);
            return ResponseEntity.ok(docDownload);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable Long id) {
        try {
            Resource resource = docDownloadService.downloadDocumentAsResource(id);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<DocDownload>> getAllDocuments() {
        try {
            List<DocDownload> documents = docDownloadService.getAllDocuments();
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
