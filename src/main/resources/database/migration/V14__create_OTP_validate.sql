CREATE TABLE otp_validation (
    id SERIAL PRIMARY KEY, -- Auto-incremented primary key
    email VARCHAR(255), -- Email address (nullable for phone validations)
    phone_number VARCHAR(15), -- Phone number (nullable for email validations)
    otp VARCHAR(6) NOT NULL, -- OTP (6-digit code)
    otp_generated_at TIMESTAMP NOT NULL, -- Timestamp when OTP was generated
    expires_at TIMESTAMP NOT NULL, -- Expiry time for the OTP
    verified BOOLEAN DEFAULT FALSE, -- Verification status (default to false)
    created_by BIGINT NOT NULL, -- User ID of the creator
    created_date TIMESTAMP NOT NULL DEFAULT NOW(), -- Creation timestamp
    updated_by BIGINT, -- User ID of the updater
    updated_date TIMESTAMP, -- Last update timestamp
    ip_address VARCHAR(255) DEFAULT '00:00:00:00', -- IP address for auditing
    CONSTRAINT unique_email_phone UNIQUE (email, phone_number) -- Ensure unique email/phone_number for validation
);

CREATE INDEX idx_email_otp ON otp_validation (email, otp);
CREATE INDEX idx_phone_otp ON otp_validation (phone_number, otp);
