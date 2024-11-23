package com.inn.pcda.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.inn.pcda.users.service.ICustomUserDetailsService;

@Configuration
public class SecurityConfig {

    private final ICustomUserDetailsService customUserDetailsService;

    public SecurityConfig(ICustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity (re-enable in production)
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/auth/register", "/auth/login", "/css/**", "/js/**").permitAll()
                // Role-based access
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasRole("USER")
                .requestMatchers("/officer/**").hasRole("OFFICER")
                // All other endpoints require authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/auth/login") // Corrected with leading slash
                .failureUrl("/auth/login?error") // Corrected with leading slash
                .defaultSuccessUrl("/") // Redirect to home page after successful login
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/auth/logout") // Correct logout URL
                .logoutSuccessUrl("/auth/login") // Redirect to login page after logout
                .permitAll()
            );

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
}
