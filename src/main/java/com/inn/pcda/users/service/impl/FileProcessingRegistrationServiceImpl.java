package com.inn.pcda.users.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.dto.ResponseRegistrationDTO;
import com.inn.pcda.users.entity.Roles;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.RoleRepository;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.IFileProcessingRegistrationService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FileProcessingRegistrationServiceImpl implements IFileProcessingRegistrationService {

    private ObjectMapper objectMapper = new ObjectMapper();
    private UserRepository userRepository = null;

    @Autowired
    private RoleRepository roleRepository;

     @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    public FileProcessingRegistrationServiceImpl(ObjectMapper objectMapper, UserRepository userRepository) {
        this.objectMapper = objectMapper;
        this.userRepository = userRepository;
    }
    String randomUsername = generateRandomString();
    String randomPassword = generateRandomString();

    @Override
    public String processFile(MultipartFile file) throws IOException {

       
        List<RegistrationRequestDTO> registrationRequestDTOs = objectMapper.readValue(
                file.getInputStream(),
                new TypeReference<List<RegistrationRequestDTO>>() {}
        );

        
        for (RegistrationRequestDTO dto : registrationRequestDTOs) {
            Users user = new Users();



            user.setUsername(randomUsername);
            log.info("this is password and encode this username : {}",randomUsername);

            user.setPassword(passwordEncoder.encode(randomPassword));
            log.info("this is password and encode this pasword : {}",randomPassword);

            user.setOldPassword(generateRandomString());
            user.setOfficeCode("123123");

            
            if (dto.getOfficer_Name() != null) {
                String[] nameParts = dto.getOfficer_Name().split(" ");
                user.setFirstName(nameParts[0]);
                user.setMiddleName(nameParts.length > 2 ? nameParts[1] : null); 
                user.setLastName(nameParts.length > 1 ? nameParts[nameParts.length - 1] : null); 
            } else {
                user.setFirstName(null);
                user.setMiddleName(null);
                user.setLastName(null);
            }

            
            user.setEmail(dto.getEmail());
            user.setTaskNo(dto.getTask_no());
            user.setAccountNo(dto.getAccountno());

           
            Roles role = roleRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("Role not found with ID: 1"));

            user.setRole(role);

           
            userRepository.save(user);
        }

        return "File successfully processed and data saved to User table!";
    }

    
    private String generateRandomString() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    public List<ResponseRegistrationDTO> downloadAllDataAsJson() {
        // Fetch all users from the database
        List<Users> users = userRepository.findAll();

        // Convert Users to RegistrationRequestDTO
        return users.stream().map(user -> {
            ResponseRegistrationDTO dto = new ResponseRegistrationDTO();
            dto.setUsername(user.getUsername());
           
            dto.setTask_no(user.getTaskNo());
            dto.setAccountno(user.getAccountNo());
            dto.setOfficer_Name(user.getFirstName() + " " + user.getMiddleName() + " " + user.getLastName());
            return dto;
        }).collect(Collectors.toList());
    }

}
