-- ============================================================
-- مسابقة الماهر بالقرآن الكريم 2025
-- Supabase SQL Schema
-- ============================================================
-- Instructions:
-- 1. Go to your Supabase project dashboard
-- 2. Open the SQL Editor
-- 3. Paste and run this entire script
-- 4. Your database is ready!
-- ============================================================

-- Create the registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 3 AND age <= 100),
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  national_id TEXT UNIQUE NOT NULL,
  address TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  has_whatsapp BOOLEAN NOT NULL DEFAULT FALSE,
  sheikh_name TEXT NOT NULL,
  participated_before BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (recommended)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for registration)
-- Allow anyone to insert (registration is public)
CREATE POLICY "Allow anonymous inserts"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to select (needed for admin)
CREATE POLICY "Allow anonymous selects"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous updates (for admin status changes)
CREATE POLICY "Allow anonymous updates"
  ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow anonymous deletes (for admin)
CREATE POLICY "Allow anonymous deletes"
  ON registrations
  FOR DELETE
  TO anon
  USING (true);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_registrations_national_id ON registrations (national_id);
CREATE INDEX IF NOT EXISTS idx_registrations_phone ON registrations (phone);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_gender ON registrations (gender);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations (created_at DESC);
