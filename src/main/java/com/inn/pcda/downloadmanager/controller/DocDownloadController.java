package com.inn.pcda.downloadmanager.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.inn.pcda.downloadmanager.dto.AddDocDto;
import com.inn.pcda.downloadmanager.dto.ResponseDto;
import com.inn.pcda.downloadmanager.dto.UpdateDocDto;
import com.inn.pcda.downloadmanager.entity.DocDownload;
import com.inn.pcda.downloadmanager.services.IDocDownloadService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/document")
public class DocDownloadController {

    private final IDocDownloadService docDownloadService;

    public DocDownloadController(IDocDownloadService docDownloadService) {
        this.docDownloadService = docDownloadService;
    }

    @Operation(
            summary = "Add a new document",
            description = "Uploads a new document with metadata."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document added successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error occurred")
    })
    @PostMapping
    public ResponseEntity<DocDownload> addDocument(
            @ModelAttribute AddDocDto dto, 
            @RequestParam("file") MultipartFile file) {
        try {
            DocDownload docDownload = docDownloadService.addDocument(dto, file);
            return ResponseEntity.ok(docDownload);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Operation(
            summary = "Update an existing document",
            description = "Updates metadata and optionally replaces the file of an existing document."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid data or update failed"),
            @ApiResponse(responseCode = "500", description = "Internal server error occurred")
    })
    @PutMapping("/{id}")
    public ResponseEntity<String> updateDocument(
            @PathVariable Long id, 
            @ModelAttribute UpdateDocDto dto, 
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            if (Boolean.TRUE.equals(docDownloadService.updateDocument(id, dto, file))) {
                return ResponseEntity.ok("Document updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Document update failed");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(
            summary = "Delete a document",
            description = "Deletes an existing document by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Deletion failed"),
            @ApiResponse(responseCode = "500", description = "Internal server error occurred")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            if (Boolean.TRUE.equals(docDownloadService.deleteDocument(id))) {
                return ResponseEntity.ok("Document deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Document deletion failed");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(
            summary = "Get document details",
            description = "Fetches details of a document by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document details fetched successfully"),
            @ApiResponse(responseCode = "404", description = "Document not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto> getDocumentDetails(@PathVariable Long id) {
        try {
            ResponseDto docDownload = docDownloadService.getDocumentDetails(id);
            return ResponseEntity.ok(docDownload);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @Operation(
            summary = "Download a document",
            description = "Downloads the file of a document by its ID."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Document downloaded successfully"),
            @ApiResponse(responseCode = "404", description = "Document not found")
    })
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

    @Operation(
            summary = "Get all documents",
            description = "Fetches a list of all documents with their details."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Documents fetched successfully"),
            @ApiResponse(responseCode = "500", description = "Internal server error occurred")
    })
    @GetMapping
    public ResponseEntity<List<ResponseDto>> getAllDocuments() {
        try {
            List<ResponseDto> documents = docDownloadService.getAllDocuments();
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
