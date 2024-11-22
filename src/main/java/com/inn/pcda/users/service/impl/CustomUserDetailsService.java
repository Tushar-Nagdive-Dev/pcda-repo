package com.inn.pcda.users.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.ICustomUserDetailsService;

public class CustomUserDetailsService implements ICustomUserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = this.userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .roles(user.getRole().getName())
            .build();
    }
    
}
