-- Disable RLS for all tables in public schema and drop all policies
-- Run this in Supabase SQL Editor (or psql connected to your Supabase DB)

-- Drop all policies in public schema
DO $$
DECLARE
  p record;
BEGIN
  FOR p IN SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public' LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END$$;

-- Disable RLS on all tables in public schema
DO $$
DECLARE
  t record;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I DISABLE ROW LEVEL SECURITY;', t.tablename);
  END LOOP;
END$$;

-- Optional: verify current policies and rls state
-- SELECT * FROM pg_policies WHERE schemaname='public';
-- SELECT schemaname, tablename, relrowsecurity FROM pg_tables JOIN pg_class ON relname = tablename WHERE schemaname='public';
