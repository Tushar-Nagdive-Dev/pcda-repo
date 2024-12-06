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

    /* @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                new org.springframework.web.cors.CorsConfiguration().applyPermitDefaultValues();

            }).csrf(csrf -> csrf.disable())
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
                    "/api/gellery/**",
                    "/api/testimonial/**",
                    "/api/faqdetails/**"
                ).permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/officer/**").hasRole("OFFICER")
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .formLogin(form -> form.disable())
            .logout(logout -> logout
                .logoutUrl("/auth/logout")
                .logoutSuccessUrl("/auth/login")
                .permitAll());
        return http.build();
    } */

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
                config.addAllowedOrigin("http://localhost:5173"); // Frontend origin
                config.addAllowedOrigin("http://localhost:3000"); // Alternative frontend origin
                config.addAllowedMethod("*"); // Allow all HTTP methods
                config.addAllowedHeader("*"); // Allow all headers
                config.setAllowCredentials(true); // Allow credentials like cookies or Authorization headers
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
                    "/api/faqdetails/**"
                ).permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/officer/**").hasRole("OFFICER")
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
