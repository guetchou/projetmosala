-- Script SQL - Diagnostic et Correction de la Table Users
-- Exécutez chaque requête dans Supabase SQL Editor

-- ============================================
-- PARTIE 1: DIAGNOSTIC
-- ============================================

-- Query 1.1: Vérifier si la table users existe
SELECT 
  EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='users') as table_exists;

-- Query 1.2: Lister toutes les colonnes de la table users
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public'
  AND table_name = 'users'
ORDER BY ordinal_position;

-- Query 1.3: Compter le nombre d'utilisateurs
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN role IN ('superadmin', 'admin', 'admin_content') THEN 1 END) as admin_count
FROM users;

-- Query 1.4: Afficher tous les utilisateurs
SELECT 
  id,
  name,
  email,
  role,
  created_at,
  updated_at
FROM users
ORDER BY created_at DESC;

-- Query 1.5: Vérifier les RLS sur la table users
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

-- ============================================
-- PARTIE 2: CORRECTIONS
-- ============================================

-- Correction 2.1: Ajouter les colonnes manquantes si nécessaire
ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Query: Vérifier que la colonne a été ajoutée
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name='users' AND column_name='is_active';

-- ============================================
-- PARTIE 3: RLS (Row Level Security)
-- ============================================

-- Vérifier si RLS est activée
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

-- Si RLS est désactivée, l'activer:
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Créer des politiques de base si elles n'existent pas

-- Politique 3.1: Permettre la lecture à tous les authentifiés
CREATE POLICY "Allow authenticated to read users"
ON users
FOR SELECT
TO authenticated
USING (true);

-- Politique 3.2: Permettre aux superadmins d'insérer
CREATE POLICY "Allow superadmin to insert users"
ON users
FOR INSERT
TO authenticated
WITH CHECK (
  COALESCE(auth.jwt()->>'role', '') = 'superadmin'
  OR auth.uid()::text = id::text
);

-- Politique 3.3: Permettre aux superadmins de mettre à jour
CREATE POLICY "Allow superadmin to update users"
ON users
FOR UPDATE
TO authenticated
USING (COALESCE(auth.jwt()->>'role', '') = 'superadmin')
WITH CHECK (COALESCE(auth.jwt()->>'role', '') = 'superadmin');

-- Politique 3.4: Permettre aux superadmins de supprimer
CREATE POLICY "Allow superadmin to delete users"
ON users
FOR DELETE
TO authenticated
USING (COALESCE(auth.jwt()->>'role', '') = 'superadmin');

-- ============================================
-- PARTIE 4: VÉRIFICATION FINALE
-- ============================================

-- Vérification 4.1: Confirmer que tout est en place
SELECT 
  'Table users' as item,
  'EXISTS' as status
WHERE EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name='users')
UNION ALL
SELECT 
  'Colonne id',
  'EXISTS'
WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='id')
UNION ALL
SELECT 
  'Colonne name',
  'EXISTS'
WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='name')
UNION ALL
SELECT 
  'Colonne email',
  'EXISTS'
WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='email')
UNION ALL
SELECT 
  'Colonne role',
  'EXISTS'
WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role')
UNION ALL
SELECT 
  'Colonne is_active',
  'EXISTS'
WHERE EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_active')
UNION ALL
SELECT 
  'RLS Enabled',
  'YES'
WHERE (SELECT rowsecurity FROM pg_tables WHERE tablename='users' LIMIT 1) = true;

-- Vérification 4.2: Afficher les RLS qui existent
SELECT COUNT(*) as rls_policies
FROM pg_policies
WHERE tablename = 'users';

-- ============================================
-- PARTIE 5: EXEMPLE DE TEST
-- ============================================

-- Créer un admin de test (exécutez seulement si vous en avez besoin)
INSERT INTO users (name, email, role, is_active)
VALUES ('Admin Test', 'test-admin@example.com', 'superadmin', true)
ON CONFLICT (email) DO NOTHING;

-- Vérifier que l'admin de test a été créé
SELECT id, name, email, role, is_active
FROM users
WHERE email = 'test-admin@example.com';
