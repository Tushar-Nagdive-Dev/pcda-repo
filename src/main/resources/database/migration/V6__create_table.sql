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
    event_name VARCHAR(255) NOT NULL,
    type gallery_types_enum NOT NULL, -- Enum type for gallery type
    year INT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    created_by INT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(50) DEFAULT '0.0.0.0'
);

CREATE TABLE gallery_files (
    id SERIAL PRIMARY KEY,
    gallery_id INT NOT NULL REFERENCES gallery(id) ON DELETE CASCADE,
    file_id INT NOT NULL
);


