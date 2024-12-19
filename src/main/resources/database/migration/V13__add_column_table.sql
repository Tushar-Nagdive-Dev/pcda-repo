-- Step 1: Add the wing_id column (initially nullable)
ALTER TABLE doc_download
ADD COLUMN wing_id BIGINT,
ADD CONSTRAINT fk_doc_download_wing FOREIGN KEY (wing_id) REFERENCES wings(id);

-- Step 3: Assign the default wing ID to existing records
UPDATE doc_download
SET wing_id = 1
WHERE wing_id IS NULL;

-- Step 4: Make the wing_id column NOT NULL
ALTER TABLE doc_download
ALTER COLUMN wing_id SET NOT NULL;

-- Drop pdcao_messages table
DROP TABLE IF EXISTS pdcao_messages;
