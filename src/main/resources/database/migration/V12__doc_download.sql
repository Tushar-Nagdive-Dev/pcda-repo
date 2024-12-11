CREATE TABLE doc_download (
    id SERIAL PRIMARY KEY, -- Primary key inherited from BaseEntity
    title VARCHAR(255) NOT NULL, -- Title in English
    title_in_hindi VARCHAR(255) NOT NULL, -- Title in Hindi
    document_path TEXT NOT NULL, -- Path to the document
    status BOOLEAN NOT NULL, -- Status of the document
    ui_order INTEGER NOT NULL, -- UI display order
    created_by BIGINT NOT NULL, -- User ID of the creator
    created_date TIMESTAMP NOT NULL DEFAULT NOW(), -- Creation timestamp
    updated_by BIGINT, -- User ID of the updater
    updated_date TIMESTAMP, -- Last update timestamp
    ip_address VARCHAR(255) DEFAULT '00:00:00:00', -- IP address for auditing
    version INTEGER NOT NULL DEFAULT 0 -- Optimistic locking version column
);
