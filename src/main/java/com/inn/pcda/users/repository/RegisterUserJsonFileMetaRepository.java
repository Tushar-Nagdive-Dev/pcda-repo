package com.inn.pcda.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.RegisterUserJsonFileMetadata;

@Repository
public interface RegisterUserJsonFileMetaRepository extends JpaRepository<RegisterUserJsonFileMetadata, Long>{
}   
