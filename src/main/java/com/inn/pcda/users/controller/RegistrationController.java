package com.inn.pcda.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.inn.pcda.exceptions.RegistrationException;
import com.inn.pcda.users.dto.RegistrationRequestDTO;
import com.inn.pcda.users.service.impl.RegistrationService;

@Controller
@RequestMapping("/auth")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // Show registration page
    @GetMapping("/register")
    public String showRegisterPage() {
        return "register"; // Thymeleaf template
    }

    // Handle registration
    @PostMapping("/register")
    public String registerUser(@ModelAttribute RegistrationRequestDTO request, Model model) {
        try {
            registrationService.registerUser(request);
            model.addAttribute("success", "User registered successfully! Please log in.");
            return "redirect:/auth/login";
        } catch (RegistrationException e) {
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }
}
