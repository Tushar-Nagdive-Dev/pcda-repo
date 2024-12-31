CREATE TABLE register_user_file_metadata (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL UNIQUE,
    total_records INT NOT NULL,
    processed_records INT DEFAULT 0,
    status VARCHAR(50) NOT NULL, -- e.g., "Processing", "Completed", "Failed"
    created_by BIGINT NOT NULL, -- User ID of the creator
    created_date TIMESTAMP NOT NULL DEFAULT NOW(), -- Creation timestamp
    updated_by BIGINT, -- User ID of the updater
    updated_date TIMESTAMP, -- Last update timestamp
    ip_address VARCHAR(255) DEFAULT '00:00:00:00' -- IP address for auditing
);
