package com.inn.pcda.pcdamanages.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.Gallery;

@Repository
public interface GalleryRepo extends JpaRepository<Gallery, Long>{
    
}
