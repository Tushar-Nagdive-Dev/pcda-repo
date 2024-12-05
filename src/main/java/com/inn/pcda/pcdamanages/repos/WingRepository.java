package com.inn.pcda.pcdamanages.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.pcdamanages.entity.Wing;
import com.inn.pcda.pcdamanages.enums.WingsTypes;

@Repository
public interface WingRepository extends JpaRepository<Wing, Long>{
    Optional<Wing> findByWingsType(WingsTypes wingsType);
}
