package com.inn.pcda.users.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.inn.pcda.users.service.IRecaptchaValidationService;

@Controller
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IRecaptchaValidationService recaptchaValidationService;

    // Show login page
    @GetMapping("/login")
    public String showLoginPage() {
        return "login"; // Thymeleaf template
    }

    // Handle login
    @PostMapping("/login")
    public String login(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam("g-recaptcha-response") String recaptchaResponse,
            Model model) {

        // Validate CAPTCHA
        if (!recaptchaValidationService.validateCaptcha(recaptchaResponse)) {
            model.addAttribute("error", "Invalid reCAPTCHA. Please try again.");
            return "login";
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return "redirect:/"; // Redirect to home page after successful login
        } catch (Exception e) {
            model.addAttribute("error", "Invalid username or password. Please try again.");
            return "login";
        }
    }
}
