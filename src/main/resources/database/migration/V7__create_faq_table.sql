CREATE TABLE fao_details (
    id SERIAL PRIMARY KEY,
    wings VARCHAR(255),
    sections VARCHAR(255),
    question VARCHAR(255),
    answers VARCHAR(255),
    is_active BOOLEAN DEFAULT false,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);
