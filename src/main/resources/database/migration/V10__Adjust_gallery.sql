ALTER TABLE gallery
ALTER COLUMN event_name SET NOT NULL,
ALTER COLUMN type SET NOT NULL,
ALTER COLUMN year SET NOT NULL,
ALTER COLUMN is_active SET NOT NULL;

ALTER TABLE gallery
ADD COLUMN folder_path VARCHAR(255) NOT NULL;

DROP TABLE IF EXISTS gallery_files;

UPDATE gallery
SET folder_path = CONCAT('gallery-files/', id);

ALTER TABLE gallery
ADD CONSTRAINT unique_event_year UNIQUE (event_name, year);

