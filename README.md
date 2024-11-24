# pcda-repo

You're absolutely correct, Tushar! Let's refine the documentation to ensure **every critical step and change made** to your PCDA application—from backend to frontend—reflects the actual implementation. Here’s the **updated, detailed, and comprehensive documentation**:

---

## **Full PCDA Application Documentation**

This document covers the backend (Spring Boot) and frontend (React), including every essential step, configuration, and integration.

---

### **1. Project Structure**

Your project structure should look like this:

```
PCDA/
├── src/ (Spring Boot backend source code)
│   ├── main/
│   │   ├── java/com/inn/pcda/
│   │   │   ├── configs/         <-- Security and application configs
│   │   │   ├── controllers/     <-- Rest endpoints
│   │   │   ├── dto/             <-- Data Transfer Objects
│   │   │   ├── entities/        <-- JPA Entities
│   │   │   ├── repositories/    <-- JPA Repositories
│   │   │   ├── services/        <-- Business Logic
│   │   │   └── utils/           <-- Helper utilities
│   │   ├── resources/
│   │   │   ├── db/migration/    <-- Flyway migration files
│   │   │   ├── static/          <-- React build files
│   │   │   └── application.properties
├── pcda-react/
│   ├── pcda-ui/                 <-- React application
│   │   ├── src/                 <-- React source code
│   │   ├── public/
│   │   ├── package.json
│   │   └── build/               <-- React build output
├── pom.xml                      <-- Maven configuration
└── target/
```

---

### **2. Backend: Spring Boot**

#### **2.1 Key Backend Features**
1. **Authentication and Authorization**:
   - Custom implementation of `UserDetailsService` for handling user login.
   - Role-based access control for endpoints (`ADMIN`, `USER`, etc.).
2. **Captcha Validation**:
   - Integrated Google reCAPTCHA for enhanced security during login and registration.
3. **Flyway for Database Migrations**:
   - Automatic schema and table versioning.
4. **Base Entity for Auditing**:
   - Automatically tracks `created_by`, `created_date`, `updated_by`, and `updated_date`.

---

#### **2.2 Configuration**

**`application.properties`**:
```properties
# Spring Boot Server
spring.application.name=pcda
server.port=8080

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/pcda_db
spring.datasource.username=pcda_user
spring.datasource.password=secure_password

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true
spring.flyway.locations=classpath:db/migration

# Security
spring.security.user.name=admin
spring.security.user.password=admin123

# reCAPTCHA
recaptcha.site-key=YOUR_SITE_KEY
recaptcha.secret-key=YOUR_SECRET_KEY
```

---

#### **2.3 Entity Classes**

Example: **User Entity**:
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
}
```

Example: **Base Entity**:
```java
@MappedSuperclass
public abstract class BaseEntity {
    @CreatedBy
    private String createdBy;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedBy
    private String updatedBy;

    @LastModifiedDate
    private LocalDateTime updatedDate;
}
```

---

#### **2.4 Security Configuration**

**`SecurityConfig.java`**:
```java
@Configuration
public class SecurityConfig {
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/register", "/auth/login", "/css/**", "/js/**").permitAll()
                .anyRequest().authenticated())
            .formLogin().loginPage("/auth/login").permitAll()
            .and()
            .logout().logoutUrl("/auth/logout").logoutSuccessUrl("/auth/login").permitAll();

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

---

### **3. Frontend: React**

#### **3.1 Setup**

1. Navigate to the React directory:
   ```bash
   cd pcda-react/pcda-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

---

#### **3.2 Key Components**

**Login Component (`Login.js`)**:
```javascript
import React, { useState } from "react";
import apiService from "../services/apiService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "", captcha: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.login(formData);
      alert("Login Successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" required />
      <input type="password" placeholder="Password" required />
      {/* Google reCAPTCHA */}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
```

**API Service (`apiService.js`)**:
```javascript
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const login = (data) => axios.post(`${API_BASE_URL}/auth/login`, data);

export default { login };
```

---

#### **3.3 Build and Integration**

1. Build the React application:
   ```bash
   npm run build
   ```

2. The build files will be in `pcda-react/pcda-ui/build`.

3. Configure `frontend-maven-plugin` in `pom.xml` to copy these files to `src/main/resources/static`.

---

### **4. Integration: Spring Boot + React**

#### **Frontend Maven Plugin**
```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.12.1</version>
    <executions>
        <execution>
            <id>install-node-and-npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
                <nodeVersion>v16.14.0</nodeVersion>
                <npmVersion>8.3.1</npmVersion>
                <workingDirectory>pcda-react/pcda-ui</workingDirectory>
            </configuration>
        </execution>
        <execution>
            <id>npm-build</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>run build</arguments>
                <workingDirectory>pcda-react/pcda-ui</workingDirectory>
            </configuration>
        </execution>
    </executions>
</plugin>
```

---

### **5. Deployment**

1. Build the full application:
   ```bash
   mvn clean package
   ```

2. Run the `.jar` file:
   ```bash
   java -jar target/pcda-0.0.1.jar
   ```

3. Access the application at `http://localhost:8080`.

---

Let me know if this captures all the steps or if you'd like further adjustments! 😊