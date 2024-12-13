package com.inn.pcda.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.external.gallery.path}")
    private String externalGalleryPath;

    @Value("${file.external.testimonial.path}")
    private String externalTestimonialPath;

    @Value("${file.external.news-and-notifications.path}")
    private String newsAndNotificationsPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resource handler for gallery files
        registry.addResourceHandler("/gallery-files/**")
                .addResourceLocations("file:" + externalGalleryPath);

        registry.addResourceHandler("/testimonials/**")
                .addResourceLocations("file:" + externalTestimonialPath)
                .setCachePeriod(3600);

        registry.addResourceHandler("/news-and-notifications/**")
                .addResourceLocations("file:" + newsAndNotificationsPath)
                .setCachePeriod(3600);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:3000") // Frontend origins
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // HTTP methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials
    }
}
