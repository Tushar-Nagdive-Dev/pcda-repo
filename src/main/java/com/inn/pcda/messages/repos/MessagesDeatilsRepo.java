package com.inn.pcda.messages.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inn.pcda.messages.entity.MessagesDetails;
import com.inn.pcda.messages.enums.Types;

@Repository
public interface MessagesDeatilsRepo extends JpaRepository<MessagesDetails, Long>{
    
    List<MessagesDetails> findByType(Types types);

    Optional<MessagesDetails> findById(Long id);

}
