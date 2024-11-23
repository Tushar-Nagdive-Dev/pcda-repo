CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    office_code VARCHAR(20) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    old_password VARCHAR(255),
    role_id INT NOT NULL REFERENCES roles(id), -- Assuming roles table exists
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    account_no VARCHAR(30) UNIQUE NOT NULL, -- Treated as an alternate primary key
    task_no INT DEFAULT 0,
    created_by INT, -- Base entity
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    updated_by INT, -- Base entity
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    ip_address VARCHAR(50) DEFAULT '0.0.0.0', -- Base entity
    is_old_password BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_config (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to users table
    question VARCHAR(255), -- Security question
    answer VARCHAR(255), -- Security answer
    password_counter INT DEFAULT 0,
    last_forget_date TIMESTAMP,
    last_password_date TIMESTAMP,
    password_reset_status CHAR(1) DEFAULT 'N',
    term_and_condition CHAR(1) DEFAULT 'N',
    last_login TIMESTAMP,
    email_otp VARCHAR(10),
    mobile_otp VARCHAR(10),
    email_otp_created TIMESTAMP,
    mobile_otp_created TIMESTAMP,
    email_verified_count INT DEFAULT 0,
    mobile_verified_count INT DEFAULT 0,
    email_verified_at TIMESTAMP,
    mobile_verified_at TIMESTAMP,
    auth_data TEXT,
    otp VARCHAR(10),
    otp_created_at TIMESTAMP,
    forgot_otp VARCHAR(10),
    forgot_otp_created TIMESTAMP,
    auth_data_old TEXT,
    reset_otp VARCHAR(10),
    reset_otp_created TIMESTAMP,
    created_by INT, -- Base entity
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    updated_by INT, -- Base entity
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    ip_address VARCHAR(50) DEFAULT '0.0.0.0' -- Base entity
);
