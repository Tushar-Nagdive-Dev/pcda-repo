package com.inn.pcda.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.users.entity.Roles;

@Repository
public interface RoleRepository extends JpaRepository<Roles, Long>{
    // Find a role by its name
    Optional<Roles> findByName(String name);
}
