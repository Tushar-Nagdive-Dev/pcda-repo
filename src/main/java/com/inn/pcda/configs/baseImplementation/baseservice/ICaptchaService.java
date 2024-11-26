package com.inn.pcda.configs.baseImplementation.baseservice;

import java.util.Map;
import java.awt.image.BufferedImage;

public interface ICaptchaService {
    
    Map<String, String> generateCaptcha();

    boolean validateCaptcha(String token, String userInput);

    String generateRandomText(Integer length);

    String generateToken();

    BufferedImage createCaptchaImage(String text);

    String encodeImageToBase64(BufferedImage image);
}
