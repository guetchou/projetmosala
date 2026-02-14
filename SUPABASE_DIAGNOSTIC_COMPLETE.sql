-- ============================================================
-- SUPABASE DIAGNOSTIC - Vérifier Configuration et Données
-- ============================================================
-- Exécutez chaque bloc séquentiellement dans SQL Editor

-- ============================================================
-- PARTIE 1: VÉRIFIER LES DONNÉES
-- ============================================================

-- Query 1.1: Compter les utilisateurs
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN role IN ('superadmin', 'admin', 'admin_content') THEN 1 END) as admin_count
FROM users;

-- Query 1.2: Afficher les 10 premiers utilisateurs
SELECT 
  id,
  name,
  email,
  role,
  created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;

-- Query 1.3: Vérifier la structure de la table
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users'
ORDER BY ordinal_position;

-- ============================================================
-- PARTIE 2: VÉRIFIER RLS STATUS
-- ============================================================

-- Query 2.1: Vérifier si RLS est activé
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'users';

-- Query 2.2: Lister les RLS Policies
SELECT 
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'users';

-- ============================================================
-- PARTIE 3: TESTER RLS (une fois connecté en tant qu'utilisateur)
-- ============================================================

-- Query 3.1: Tester SELECT avec RLS (reproduit ce que votre app fait)
SELECT 
  id,
  name,
  email,
  role
FROM users
LIMIT 5;

-- Query 3.2: Compter les lignes que vous pouvez voir
SELECT COUNT(*) as accessible_rows FROM users;

-- ============================================================
-- PARTIE 4: SOLUTION - Créer les RLS Policies
-- ============================================================
-- À exécuter si RLS est activé mais sans policies

-- Query 4.1: Vérifier que RLS est activé
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Query 4.2: Créer une policy de lecture pour les utilisateurs authentifiés
CREATE POLICY "Enable read access for authenticated users" ON users
  FOR SELECT
  TO authenticated
  USING (true);

-- Query 4.3: Créer une policy pour les admins (optionnel)
CREATE POLICY "Admins can manage users" ON users
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'superadmin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'superadmin');

-- ============================================================
-- PARTIE 5: TESTER LES DONNÉES (si zéro ligne)
-- ============================================================

-- Query 5.1: Insérer un admin de test
INSERT INTO users (name, email, role, password, created_at) 
VALUES ('Test Admin', 'admin@test.com', 'superadmin', 'temp_password_123', NOW())
ON CONFLICT (email) DO NOTHING;

-- Query 5.2: Vérifier l'insertion
SELECT * FROM users WHERE email = 'admin@test.com';

-- ============================================================
-- PARTIE 6: NETTOYER (optionnel)
-- ============================================================

-- Query 6.1: Voir toutes les policies (pour nettoyer les doublons)
SELECT policyname FROM pg_policies WHERE tablename = 'users';

-- Query 6.2: Supprimer une policy en cas de doublon (adapter le nom)
-- DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;

-- ============================================================
-- FIN - Retour au Dashboard
-- ============================================================
-- Après exécution:
-- 1. Allez à http://localhost:5173/superadmin/dashboard
-- 2. Cliquez "✅ Vérifier Authentification"
-- 3. Allez à "Gérer les administrateurs"
-- 4. Cliquez "Relancer le test"
-- 5. Vous devriez voir ✅ au lieu de ❌
