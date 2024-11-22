package com.inn.pcda.configs.baseImplementation.audits;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.inn.pcda.users.entity.Users;

public class CustomAuditorAware implements AuditorAware<Long>{

    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }

        Users users = (Users) authentication.getPrincipal();
        return Optional.ofNullable(users.getId());
    }
    
}
