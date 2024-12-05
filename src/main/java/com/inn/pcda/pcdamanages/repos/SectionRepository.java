package com.inn.pcda.pcdamanages.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.Section;
import com.inn.pcda.pcdamanages.entity.Wing;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long>{
    Optional<Section> findByIdAndWing(Long id, Wing wing);
}
