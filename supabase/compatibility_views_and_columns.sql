-- Compatibility fixes to match frontend expectations
-- Run this in Supabase SQL Editor

-- 1) Add French 'titre' column expected by frontend
ALTER TABLE IF EXISTS public.news
  ADD COLUMN IF NOT EXISTS titre text;

-- Copy existing English title into titre for existing rows
UPDATE public.news SET titre = title WHERE titre IS NULL AND title IS NOT NULL;

-- 2) Create view 'formations_advanced' if frontend expects it
CREATE OR REPLACE VIEW public.formations_advanced AS
SELECT * FROM public.formations;

-- 3) Create a public.users view to provide minimal user info from auth.users
--    (frontend attempted to query public.users; provide id, email, name, role)
-- Create a safe view `public.users` that reads metadata from `raw_user_meta_data` (exists on auth.users)
CREATE OR REPLACE VIEW public.users AS
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data ->> 'name', '') AS name,
  COALESCE(u.raw_user_meta_data ->> 'role', '') AS role,
  u.created_at
FROM auth.users u;

-- 4) Ensure public.profiles exists (safety)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Notes:
-- - These changes keep things simple (no RLS). For production, reintroduce RLS and policies.
-- - After running, reload your frontend and retry: signup/login → create news/formations.
