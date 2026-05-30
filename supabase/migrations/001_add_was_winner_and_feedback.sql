-- ============================================================
-- Migration 001: Add was_winner and feedback columns
-- ============================================================
-- This migration adds the two new columns to the existing
-- registrations table that were introduced in the schema.sql
-- update but never applied to the live database.
-- ============================================================

-- Add was_winner column (optional, for winners of last year)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS was_winner BOOLEAN DEFAULT NULL;

-- Add feedback column (optional, opinion text)
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS feedback TEXT DEFAULT '';
