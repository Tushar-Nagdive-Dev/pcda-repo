package com.inn.pcda.common.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.inn.pcda.common.service.ISMSService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
public class SMSServiceImpl implements ISMSService {

    @Value("${sms.gateway.url}")
    private String smsGatewayUrl;

    @Value("${sms.gateway.username}")
    private String username;

    @Value("${sms.gateway.pin}")
    private String pin;

    @Value("${sms.gateway.senderId}")
    private String senderId;

    @Value("${sms.gateway.dltEntityId}")
    private String dltEntityId;

    @Value("${sms.gateway.dltTemplateId}")
    private String dltTemplateId;

    @Override
    public String sendOtp(String mobileNumber, String otp) {
        try {

            // Encode message
            String message = URLEncoder.encode("Your OTP is: " + otp, "UTF-8");

            // Build the URL
            String url = UriComponentsBuilder.fromHttpUrl(smsGatewayUrl)
                    .queryParam("username", username)
                    .queryParam("pin", pin)
                    .queryParam("message", message)
                    .queryParam("mnumber", mobileNumber)
                    .queryParam("signature", senderId)
                    .queryParam("dlt_entity_id", dltEntityId)
                    .queryParam("dlt_template_id", dltTemplateId)
                    .toUriString();

            log.info("Sending OTP to {}: {}", mobileNumber, url);

            // Send request and get response
            String response = sendHttpGetRequest(url);
            log.info("SMS Gateway Response: {}", response);

            // Check response for success
            if (response.contains("Message Accepted")) {
                return "OTP sent successfully to " + mobileNumber;
            } else {
                log.error("Failed to send OTP. Response: {}", response);
                return "Failed to send OTP. Please check the logs for details.";
            }
        } catch (Exception e) {
            log.error("Error sending OTP", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    private String sendHttpGetRequest(String apiUrl) throws Exception {
        HttpURLConnection conn = (HttpURLConnection) new URL(apiUrl).openConnection();
        conn.setRequestMethod("GET");

        int responseCode = conn.getResponseCode();
        if (responseCode != HttpURLConnection.HTTP_OK) {
            throw new RuntimeException("HTTP error code: " + responseCode);
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
            StringBuilder response = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            return response.toString();
        }
    }
}
