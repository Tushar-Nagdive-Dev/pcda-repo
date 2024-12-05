CREATE TABLE wings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);

CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wing_id INT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0',
    CONSTRAINT fk_wing FOREIGN KEY (wing_id) REFERENCES wings (id) ON DELETE CASCADE,
);

ALTER TABLE fao_details
    DROP COLUMN wings,
    DROP COLUMN sections,
    ADD COLUMN wing_id INT NOT NULL,
    ADD COLUMN section_id INT NOT NULL,
    ADD CONSTRAINT fk_faq_wing FOREIGN KEY (wing_id) REFERENCES wings (id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_faq_section FOREIGN KEY (section_id) REFERENCES sections (id) ON DELETE CASCADE;

