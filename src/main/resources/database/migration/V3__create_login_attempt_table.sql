CREATE TABLE login_attempts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45) NOT NULL, -- To support IPv4 and IPv6
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    counter INT DEFAULT 1,
    created_by VARCHAR(100),
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100),
    updated_date TIMESTAMP
);