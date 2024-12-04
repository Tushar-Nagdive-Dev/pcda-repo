package com.inn.pcda.configs.baseImplementation.audits;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.inn.pcda.users.entity.CustomUserDetails;
import com.inn.pcda.users.entity.Users;
import com.inn.pcda.users.repository.UserRepository;

public class CustomAuditorAware implements AuditorAware<Long> {

    private final UserRepository userRepository;

    public CustomAuditorAware(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();

        // Use a custom UserDetails implementation or cast to retrieve user ID
        if (principal instanceof CustomUserDetails) { 
            return Optional.of(((CustomUserDetails) principal).getId());
        }

        return Optional.empty();
    }




}
