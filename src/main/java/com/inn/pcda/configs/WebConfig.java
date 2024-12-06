package com.inn.pcda.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String EXTERNAL_GALLERY_PATH = "file:/Users/tusharnagdive/Development/vsWorkspace/Projects/pcda/gallery-files/";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static resources from classpath (/static/)
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");

        // Serve gallery files from external directory
        registry.addResourceHandler("/gallery-files/**")
                .addResourceLocations(EXTERNAL_GALLERY_PATH);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000") // Add your frontend origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow cookies or Authorization headers
    }
}
