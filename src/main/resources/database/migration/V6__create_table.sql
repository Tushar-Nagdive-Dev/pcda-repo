CREATE TABLE testimonial (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    name VARCHAR(255), -- Name column
    position VARCHAR(255), -- Position column
    testimonial_brief TEXT, -- Testimonial brief column with TEXT type
    status VARCHAR(255), -- Status column (enum stored as string)
    is_new BOOLEAN, -- Boolean column for "is new"
    image_id INT, -- Integer column for image ID
    created_by INT, -- From BaseEntity (optional)
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- From BaseEntity
    updated_by INT, -- From BaseEntity (optional)
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- From BaseEntity
    ip_address VARCHAR(50) DEFAULT '0.0.0.0' -- From BaseEntity
);

CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255),
    type gallery_types_enum, -- Use enum type
    year INT,
    is_active BOOLEAN DEFAULT FALSE,
    upload_file_id INT,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);
