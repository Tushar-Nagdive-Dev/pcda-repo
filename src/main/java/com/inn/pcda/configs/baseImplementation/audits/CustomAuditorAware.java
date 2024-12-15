package com.inn.pcda.configs.baseimplementation.audits;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.inn.pcda.users.entity.CustomUserDetails;
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

        // Use enhanced instanceof with pattern matching
        if (principal instanceof CustomUserDetails customUserDetails) {
            return Optional.of(customUserDetails.getId());
        }

        return Optional.empty();
    }
}
