package com.inn.pcda.users.service.impl;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.inn.pcda.users.entity.CustomUserDetails;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.UserRepository;
import com.inn.pcda.users.service.ICustomUserDetailsService;

@Service
public class CustomUserDetailsService implements ICustomUserDetailsService {

    @Autowired
    private UserRepository userRepo;

/*     @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = this.userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Convert role to GrantedAuthority
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());

        // Build UserDetails
        return User.builder()
            .username(user.getUsername())
            .password(user.getPassword())
            .authorities(Collections.singleton(authority))
            .build();
    } */
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = this.userRepo.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Convert role to GrantedAuthority
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());

        // Build and return CustomUserDetails
        return new CustomUserDetails(
            user.getId(),               // User ID
            user.getUsername(),         // Username
            user.getPassword(),         // Password
            Collections.singleton(authority) // Authorities
        );
    }
    
}
