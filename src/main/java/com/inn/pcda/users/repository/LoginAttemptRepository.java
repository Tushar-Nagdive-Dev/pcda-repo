package com.inn.pcda.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.LoginAttempt;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long>{   

    // Find by username and IP address
    Optional<LoginAttempt> findByUsernameAndIpAddress(String username, String ipAddress);

    // Delete attempts for a username (on successful login)
    void deleteByUsername(String username);
}