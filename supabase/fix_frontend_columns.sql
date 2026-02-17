-- Minimal fixes to match frontend column names and avoid 400 errors
-- Run this in Supabase SQL Editor

-- 1) news: add French columns expected by frontend
ALTER TABLE IF EXISTS public.news
  ADD COLUMN IF NOT EXISTS titre text;
ALTER TABLE IF EXISTS public.news
  ADD COLUMN IF NOT EXISTS contenu text;
-- Add image_url if frontend expects it
ALTER TABLE IF EXISTS public.news
  ADD COLUMN IF NOT EXISTS image_url text;

UPDATE public.news SET titre = title WHERE titre IS NULL AND title IS NOT NULL;
UPDATE public.news SET contenu = content WHERE contenu IS NULL AND content IS NOT NULL;
-- If an older 'image' column exists, copy to 'image_url'
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='news' AND column_name='image'
  ) THEN
    EXECUTE 'UPDATE public.news SET image_url = image WHERE image_url IS NULL AND image IS NOT NULL';
  END IF;
END$$;

-- 2) formations: add 'titre' column and create/replace view formations_advanced
ALTER TABLE IF EXISTS public.formations
  ADD COLUMN IF NOT EXISTS titre text;
UPDATE public.formations SET titre = title WHERE titre IS NULL AND title IS NOT NULL;
-- Add 'contenu' column and populate from description if present
ALTER TABLE IF EXISTS public.formations
  ADD COLUMN IF NOT EXISTS contenu text;
UPDATE public.formations SET contenu = description WHERE contenu IS NULL AND description IS NOT NULL;

-- Ensure any existing relation named formations_advanced is removed (table or view)
-- Ensure formations_advanced view exists and exposes 'titre' and 'contenu'
DROP VIEW IF EXISTS public.formations_advanced;
DROP TABLE IF EXISTS public.formations_advanced;

CREATE OR REPLACE VIEW public.formations_advanced AS
SELECT
  f.*,
  f.title AS titre,
  f.contenu AS contenu
FROM public.formations f;

-- 3) users view: include updated_at (map to created_at if no updated_at)
CREATE OR REPLACE VIEW public.users AS
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data ->> 'name', '') AS name,
  COALESCE(u.raw_user_meta_data ->> 'role', '') AS role,
  u.created_at,
  COALESCE(u.raw_user_meta_data ->> 'updated_at', to_char(u.created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))::timestamptz AS updated_at
FROM auth.users u;

-- 4) Safety: ensure profiles table exists (already present in initial script)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Notes:
-- These are minimal, pragmatic fixes so the frontend can query expected names.
-- After running, reload the frontend and retry the admin pages.
