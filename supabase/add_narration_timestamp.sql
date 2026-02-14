-- Add narration_added_at column to track when audio was added
-- This is separate from created_at which tracks when the work was originally added

ALTER TABLE literary_works ADD COLUMN narration_added_at TIMESTAMP WITH TIME ZONE;

-- For existing works with audio, set narration_added_at to their created_at time
UPDATE literary_works 
SET narration_added_at = created_at 
WHERE audio_url IS NOT NULL AND narration_added_at IS NULL;

-- Create index for better query performance when sorting by narration_added_at
CREATE INDEX idx_literary_works_narration_added_at ON literary_works(narration_added_at DESC NULLS LAST);
