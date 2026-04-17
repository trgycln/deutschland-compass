-- Add user_fingerprint column to place_checkins table
-- Run this in Supabase SQL Editor

ALTER TABLE place_checkins
  ADD COLUMN IF NOT EXISTS user_fingerprint TEXT;

-- Optional index for faster duplicate-check queries
CREATE INDEX IF NOT EXISTS idx_place_checkins_fingerprint
  ON place_checkins(place_slug, user_fingerprint);
