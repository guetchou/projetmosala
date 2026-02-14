-- Fix RLS Policies for Admin Panel
-- This script enables admin users (superadmin, admin_content, admin) to fully manage content

-- Disable RLS temporarily to drop and recreate policies
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE formations_advanced DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations_advanced ENABLE ROW LEVEL SECURITY;

-- ================ USERS TABLE POLICIES ================
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view active users" ON users;
DROP POLICY IF EXISTS "Superadmin full access users" ON users;

-- Policy: Everyone can view active users
CREATE POLICY "Users can view active users" ON users
  FOR SELECT
  USING (is_active = true);

-- Policy: Admins can do anything on users table
CREATE POLICY "Admin full access users" ON users
  FOR ALL
  TO authenticated
  USING (
    -- Allow if current user has admin role
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
    OR
    -- Allow if user_id matches (self)
    auth.uid()::text = id::text
  )
  WITH CHECK (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
    OR
    auth.uid()::text = id::text
  );

-- ================ NEWS TABLE POLICIES ================
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view published news" ON news;
DROP POLICY IF EXISTS "Authenticated can insert news" ON news;
DROP POLICY IF EXISTS "Superadmin can update news" ON news;
DROP POLICY IF EXISTS "Superadmin can delete news" ON news;

-- Policy: Everyone can view published news
CREATE POLICY "Everyone can view published news" ON news
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert news
CREATE POLICY "Authenticated can insert news" ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Admins can update news
CREATE POLICY "Admin can update news" ON news
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  )
  WITH CHECK (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  );

-- Policy: Admins can delete news
CREATE POLICY "Admin can delete news" ON news
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  );

-- ================ FORMATIONS_ADVANCED TABLE POLICIES ================
-- Drop existing policies
DROP POLICY IF EXISTS "Users can view published formations" ON formations_advanced;
DROP POLICY IF EXISTS "Authenticated can insert formations" ON formations_advanced;
DROP POLICY IF EXISTS "Superadmin can update formations" ON formations_advanced;
DROP POLICY IF EXISTS "Superadmin can delete formations" ON formations_advanced;

-- Policy: Everyone can view formations
CREATE POLICY "Everyone can view formations" ON formations_advanced
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert formations
CREATE POLICY "Authenticated can insert formations" ON formations_advanced
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Admins can update formations
CREATE POLICY "Admin can update formations" ON formations_advanced
  FOR UPDATE
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  )
  WITH CHECK (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  );

-- Policy: Admins can delete formations
CREATE POLICY "Admin can delete formations" ON formations_advanced
  FOR DELETE
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('superadmin', 'admin_content', 'admin')
  );

-- Verify policies were created
SELECT tablename, policyname FROM pg_policies 
WHERE tablename IN ('users', 'news', 'formations_advanced')
ORDER BY tablename, policyname;
