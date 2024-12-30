package com.inn.pcda.users.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long>{
    // Find a user by their username
    Optional<Users> findByUsername(String username);

    // Check if a username already exists
    Boolean existsByUsername(String username);

    // Find a user by their email
    Optional<Users> findByEmail(String email);

    // Check if a email already exists
    Boolean existsByEmail(String email);
    
    Optional<Users> findByAccountNo(String accountNo);

    List<Users> findAllByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate);
}
