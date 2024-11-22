package com.inn.pcda.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.UserConfigs;

@Repository
public interface UserConfigRepository extends JpaRepository<UserConfigs, Long>{
    // Find user configuration by user ID
    Optional<UserConfigs> findByUserId(Long userId);
}
