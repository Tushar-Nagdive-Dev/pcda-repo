package com.inn.pcda.configs.baseImplementation.audits;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.inn.pcda.configs.baseImplementation.BaseEntity;

public class IpAddressEntityListener {

    @PrePersist
    @PreUpdate
    public void setIpAddress(BaseEntity entity) {
        ServletRequestAttributes attributes =
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            if (request != null) {
                String ipAddress = request.getRemoteAddr();
                entity.setIpAddress(ipAddress);
            }
        }
    }
}
