package com.inn.pcda.configs.baseImplementation.audits;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

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
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            String username = ((User) principal).getUsername();
            // Fetch the Users entity from the repository
            return userRepository.findByUsername(username)
                .map(Users::getId);
        }

        return Optional.empty();
    }
}
