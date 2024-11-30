package com.inn.pcda.configs.baseImplementation;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.inn.pcda.configs.baseImplementation.audits.IpAddressEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class, IpAddressEntityListener.class})
public abstract class BaseEntity {
    
    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    private Long createdBy; // User ID of the creator

    @CreatedDate
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate; // Timestamp of creation

    @LastModifiedBy
    @Column(name = "updated_by")
    private Long updatedBy; // User ID of the updater

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime updatedDate; // Timestamp of the last update

    @Column(name = "ip_address")
    private String ipAddress; // IP address for additional auditing

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Long getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}
