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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.inn.pcda.configs.utils.JwtFilter;
import com.inn.pcda.users.service.ICustomUserDetailsService;

@Configuration
public class SecurityConfig {

    private final ICustomUserDetailsService customUserDetailsService;

    private final JwtFilter jwtFilter;

    public SecurityConfig(ICustomUserDetailsService customUserDetailsService, JwtFilter jwtFilter) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtFilter = jwtFilter;
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
            .cors(cors -> cors.configurationSource(request -> {
                org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
                config.addAllowedOrigin("http://localhost:5173");
                config.addAllowedOrigin("http://localhost:3000");
                config.addAllowedMethod("*");
                config.addAllowedHeader("*");
                config.setAllowCredentials(true);
                return config;
            }))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/", 
                    "/auth/**", 
                    "/index.html", 
                    "/static/**", 
                    "/favicon.ico", 
                    "/css/**", 
                    "/js/**", 
                    "/images/**",
                    "/api/news/**",
                    "/api/gallery/**",
                    "/api/testimonial/**",
                    "/api/faqdetails/**",
                    "/gallery-files/**",
                    "/testimonials/**",
                    "/api/document/**",
                    "/news-and-notifications/**"
                ).permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .formLogin(form -> form.disable())
            .logout(logout -> logout
                .logoutUrl("/auth/logout")
                .logoutSuccessUrl("/auth/login")
                .permitAll());
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
