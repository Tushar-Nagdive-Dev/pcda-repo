package com.inn.pcda.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.inn.pcda.configs.baseImplementation.audits.CustomAuditorAware;
import com.inn.pcda.users.repository.UserRepository;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", modifyOnCreate = false)
public class JpaConfig {

    private final UserRepository userRepository;

    public JpaConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public AuditorAware<Long> auditorProvider() {
        return new CustomAuditorAware(userRepository);
    }
}
