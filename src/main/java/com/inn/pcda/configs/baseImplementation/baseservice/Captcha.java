package com.inn.pcda.configs.baseimplementation.baseservice;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class Captcha implements ICaptchaService {

    private final Map<String, String> captchaStore = new HashMap<>();
    private final Random random = new Random();

    @Override
    public Map<String, String> generateCaptcha() {
        log.info("Generating new CAPTCHA...");
        
        // Generate CAPTCHA text and token
        String captchaText = generateRandomText(6);
        String token = generateToken();

        // Store the CAPTCHA text in the store mapped to the token
        captchaStore.put(token, captchaText);
        log.debug("Generated CAPTCHA token: {}, text: {}", token, captchaText);

        // Generate the CAPTCHA image
        BufferedImage image = createCaptchaImage(captchaText);
        String base64Image = encodeImageToBase64(image);

        // Prepare the response
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("captchaImage", base64Image);
        log.info("CAPTCHA generated successfully.");
        return response;
    }

    @Override
    public boolean validateCaptcha(String token, String userInput) {
        log.info("Validating CAPTCHA for token: {}", token);

        // Check if the token exists in the store
        if (!captchaStore.containsKey(token)) {
            log.warn("Invalid CAPTCHA token: {}", token);
            return false;
        }

        // Compare the user input with the stored CAPTCHA text
        boolean isValid = captchaStore.get(token).equalsIgnoreCase(userInput);
        if (isValid) {
            log.info("CAPTCHA validation successful for token: {}", token);
        } else {
            log.warn("CAPTCHA validation failed for token: {}", token);
        }

        // Remove the token from the store after validation
        captchaStore.remove(token);
        return isValid;
    }

    @Override
    public String generateRandomText(Integer length) {
        log.debug("Generating random CAPTCHA text of length: {}", length);
        String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder captchaText = new StringBuilder();
        for (int i = 0; i < length; i++) {
            captchaText.append(chars.charAt(random.nextInt(chars.length())));
        }
        return captchaText.toString();
    }

    @Override
    public String generateToken() {
        log.debug("Generating unique CAPTCHA token...");
        return Long.toHexString(System.currentTimeMillis()) + random.nextInt(1000);
    }

    @Override
    public BufferedImage createCaptchaImage(String text) {
        log.debug("Creating CAPTCHA image for text: {}", text);

        Integer width = 200, height = 70;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = image.createGraphics();

        // Draw background
        g2d.setColor(Color.WHITE);
        g2d.fillRect(0, 0, width, height);

        // Draw CAPTCHA text
        g2d.setFont(new Font("Arial", Font.BOLD, 36));
        g2d.setColor(Color.BLACK);
        g2d.drawString(text, 30, 50);

        // Add some noise lines
        g2d.setColor(Color.GRAY);
        for (int i = 0; i < 10; i++) {
            g2d.drawLine(random.nextInt(width), random.nextInt(height), random.nextInt(width), random.nextInt(height));
        }

        g2d.dispose();
        log.debug("CAPTCHA image created successfully.");
        return image;
    }

    @Override
    public String encodeImageToBase64(BufferedImage image) {
        log.debug("Encoding CAPTCHA image to Base64...");
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            ImageIO.write(image, "png", baos);
            String base64 = Base64.getEncoder().encodeToString(baos.toByteArray());
            log.debug("CAPTCHA image encoded successfully.");
            return "data:image/png;base64," + base64;
        } catch (Exception e) {
            log.error("Error encoding image to Base64", e);
            throw new RuntimeException("Error encoding image to Base64", e);
        }
    }
}
