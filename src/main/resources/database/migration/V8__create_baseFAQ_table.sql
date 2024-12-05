-- Rename `fao_details` to `faq_details`
ALTER TABLE fao_details RENAME TO faq_details;

-- Drop `question` and `answers` columns
ALTER TABLE faq_details DROP COLUMN question, DROP COLUMN answers;

-- Drop `wings` column
ALTER TABLE faq_details DROP COLUMN wings;

-- Drop `sections` column
ALTER TABLE faq_details DROP COLUMN sections;

-- Standardize audit fields
ALTER TABLE faq_details
ALTER COLUMN created_date SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN updated_date SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN is_active SET DEFAULT false;

-- Create `wings` table
CREATE TABLE wings (
    id SERIAL PRIMARY KEY,
    faq_id INT NOT NULL REFERENCES faq_details (id) ON DELETE CASCADE,
    wings_type VARCHAR(255) NOT NULL,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);

-- Create `sections` table
CREATE TABLE sections (
    id SERIAL PRIMARY KEY,
    wing_id INT NOT NULL REFERENCES wings (id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);

-- Create `question_answers` table
CREATE TABLE question_answers (
    id SERIAL PRIMARY KEY,
    section_id INT NOT NULL REFERENCES sections (id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);
