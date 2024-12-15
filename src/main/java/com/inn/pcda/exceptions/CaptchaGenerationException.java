package com.inn.pcda.exceptions;

public class CaptchaGenerationException extends RuntimeException {

    public CaptchaGenerationException(String message) {
        super(message);
    }

    public CaptchaGenerationException(String message, Throwable cause) {
        super(message, cause);
    }
}
