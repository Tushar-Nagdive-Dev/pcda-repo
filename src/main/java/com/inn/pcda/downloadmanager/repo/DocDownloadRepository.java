package com.inn.pcda.downloadmanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.downloadmanager.entity.DocDownload;

@Repository
public interface DocDownloadRepository extends JpaRepository<DocDownload, Long>{
    
}
