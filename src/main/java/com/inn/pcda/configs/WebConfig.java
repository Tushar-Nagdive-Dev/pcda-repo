package com.inn.pcda.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // private static final String EXTERNAL_GALLERY_PATH = "file:/Users/tusharnagdive/Development/vsWorkspace/Projects/pcda/gallery-files/";
    // private static final String EXTERNAL_TESTIMONIAL_IMAGE_PATH = "file:/Users/tusharnagdive/Development/vsWorkspace/Projects/pcda/uploads/testimonials/";

    @Value("${file.external.gallery.path}")
    private String externalGalleryPath;

    @Value("${file.external.testimonial.path}")
    private String externalTestimonialPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/gallery-files/**")
                .addResourceLocations(externalGalleryPath);

        registry.addResourceHandler("/testimonials/**")
                .addResourceLocations(externalGalleryPath);
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
