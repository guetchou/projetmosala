-- Minimal schema to allow admin logins and insertion of news/formations
-- Run this in Supabase SQL Editor or via psql connected to your Supabase DB.

-- Create profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Create news table
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS public.news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  author_id uuid REFERENCES auth.users (id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- Create formations table
CREATE TABLE IF NOT EXISTS public.formations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  author_id uuid REFERENCES auth.users (id),
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz
);

-- To keep things simple for initial setup, disable RLS on these tables so
-- authenticated users can insert via the frontend while you iterate.
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations DISABLE ROW LEVEL SECURITY;

-- Trigger function to keep public.profiles in sync with auth.users
-- (When a user is created via Supabase Auth, copy name and role into profiles)
CREATE OR REPLACE FUNCTION public.sync_profile_with_auth_user()
RETURNS trigger AS $$
DECLARE
  meta jsonb;
  role_text text;
  name_text text;
BEGIN
  -- Make the trigger resilient: any error should NOT prevent the auth user
  -- creation. We catch exceptions and log a NOTICE for debugging.
  BEGIN
    -- Supabase stores user metadata under raw_user_meta_data (jsonb) on auth.users
    -- Use only raw_user_meta_data which exists on auth.users in this project
    meta := NEW.raw_user_meta_data;
    role_text := meta ->> 'role';
    name_text := meta ->> 'name';

    INSERT INTO public.profiles (id, email, full_name, role, created_at)
    VALUES (NEW.id, NEW.email, name_text, role_text, now())
    ON CONFLICT (id) DO UPDATE
      SET email = EXCLUDED.email,
          full_name = EXCLUDED.full_name,
          role = EXCLUDED.role,
          updated_at = now();
  EXCEPTION WHEN OTHERS THEN
    -- Log the error but do not raise, so signup continues
    RAISE NOTICE '[sync_profile_with_auth_user] sync failed: %', SQLERRM;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON t.tgrelid = c.oid
    WHERE t.tgname = 'sync_profile_after_insert' AND c.relnamespace = 'auth'::regnamespace
  ) THEN
    CREATE TRIGGER sync_profile_after_insert
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.sync_profile_with_auth_user();
  END IF;
END$$;

-- Notes:
-- 1) For production, prefer enabling RLS and adding policies that check JWT claims or
--    validate roles server-side. Disabling RLS is a convenience for initial setup only.
-- 2) If your frontend inserts should be restricted to certain roles, re-enable RLS
--    and add policies that reference JWT claims or perform server-side authorization.
