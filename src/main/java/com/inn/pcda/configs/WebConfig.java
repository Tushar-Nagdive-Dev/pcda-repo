package com.inn.pcda.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String FILE_PREFIX = "file:"; // Define constant for the file prefix

    @Value("${file.external.gallery.path}")
    private String externalGalleryPath;

    @Value("${file.external.testimonial.path}")
    private String externalTestimonialPath;

    @Value("${file.external.news-and-notifications.path}")
    private String newsAndNotificationsPath;

    @Value("${file.external.docDownload.path}")
    private String docDownloadPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resource handler for gallery files
        registry.addResourceHandler("/gallery-files/**")
                .addResourceLocations(FILE_PREFIX + externalGalleryPath);

        registry.addResourceHandler("/testimonials/**")
                .addResourceLocations(FILE_PREFIX + externalTestimonialPath)
                .setCachePeriod(3600);

        registry.addResourceHandler("/news-and-notifications/**")
                .addResourceLocations(FILE_PREFIX + newsAndNotificationsPath)
                .setCachePeriod(3600);
        
        registry.addResourceHandler("/doc-download/**")
                .addResourceLocations(FILE_PREFIX + docDownloadPath)
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
