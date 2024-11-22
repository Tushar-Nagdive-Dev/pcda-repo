package com.inn.pcda.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.inn.pcda.configs.baseImplementation.audits.CustomAuditorAware;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class JpaConfig {
    
    @Bean
    public AuditorAware<Long> auditorProvider() {
        return new CustomAuditorAware();
    }
}
