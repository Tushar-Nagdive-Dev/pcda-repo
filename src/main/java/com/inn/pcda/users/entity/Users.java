package com.inn.pcda.users.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.inn.pcda.configs.baseimplementation.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
@Data
public class Users extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "office_code",nullable = false)
    private String officeCode;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String oldPassword;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Roles role; // Role associated with the user

    @Column(name = "first_name",nullable = false)
    private String firstName;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "last_name",nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "account_no",nullable = false, unique = true)
    private String accountNo; // Treated as an alternate primary key

    @Column(name = "task_no")
    private Integer taskNo;

    @Column(name = "is_old_password")
    private Boolean isOldPassword = false;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserConfigs userConfig; // User configuration details

}
