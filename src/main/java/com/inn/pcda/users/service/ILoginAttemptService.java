package com.inn.pcda.users.service;

public interface ILoginAttemptService {
    
    public void recordFailedAttempt(String username, String ipAddress);

    public void clearAttempts(String username);
}
