package com.inn.pcda.downloadmanager.services;

import java.io.IOException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.inn.pcda.downloadmanager.dto.AddDocDto;
import com.inn.pcda.downloadmanager.dto.UpdateDocDto;
import com.inn.pcda.downloadmanager.entity.DocDownload;

public interface IDocDownloadService {

    public DocDownload addDocument(AddDocDto dto, MultipartFile file)throws Exception;

    public Boolean updateDocument(Long id,UpdateDocDto dto, MultipartFile file) throws Exception;

    public DocDownload getDocumentDetails(Long id);

    public Boolean deleteDocument(@PathVariable Long id) throws IOException;

    public Resource downloadDocumentAsResource(Long id);

    public List<DocDownload> getAllDocuments();
}
