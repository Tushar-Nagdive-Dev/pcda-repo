CREATE TABLE news_and_notifications (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    title_english TEXT, -- English title
    title_hindi TEXT, -- Hindi title
    type VARCHAR(255), -- Type (mapped as a string or enum)
    status VARCHAR(255), -- Status (mapped as a string or enum)
    is_new BOOLEAN DEFAULT false, -- Boolean to indicate if it's new
    ui_order INT DEFAULT 0,
    created_by INT, -- Base entity
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    updated_by INT, -- Base entity
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Base entity
    ip_address VARCHAR(50) DEFAULT '0.0.0.0' -- Base entity
);
