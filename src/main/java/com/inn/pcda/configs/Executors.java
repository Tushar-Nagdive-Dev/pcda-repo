package com.inn.pcda.configs;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Executors {
     public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin";
        String hashedPassword = encoder.encode(rawPassword);
        System.out.println("Hashed Password: " + hashedPassword);
     }
}
