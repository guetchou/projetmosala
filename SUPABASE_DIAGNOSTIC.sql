-- Diagnostic rapide des tables Supabase pour Mosala Admin
-- Exécutez ce script pour vérifier la structure

-- 1. VÉRIFIER LES TABLES EXISTANTES
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'news', 'formations_advanced')
ORDER BY table_name;

-- 2. VÉRIFIER LA TABLE 'users'
SELECT 
  table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name='users'
  ) THEN '✅ Existe' ELSE '❌ Manquante' END as status
FROM information_schema.tables
WHERE table_name = 'users' AND table_schema = 'public'
LIMIT 1;

-- Si 'users' existe, afficher sa structure:
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 3. VÉRIFIER LA TABLE 'news'
SELECT 
  table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name='news'
  ) THEN '✅ Existe' ELSE '❌ Manquante' END as status
FROM information_schema.tables
WHERE table_name = 'news' AND table_schema = 'public'
LIMIT 1;

-- Si 'news' existe, afficher sa structure:
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'news' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. VÉRIFIER LA TABLE 'formations_advanced'
SELECT 
  table_name,
  CASE WHEN EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name='formations_advanced'
  ) THEN '✅ Existe' ELSE '❌ Manquante' END as status
FROM information_schema.tables
WHERE table_name = 'formations_advanced' AND table_schema = 'public'
LIMIT 1;

-- Si 'formations_advanced' existe, afficher sa structure:
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'formations_advanced' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 5. COMPTER LES ENREGISTREMENTS
SELECT 
  'users' as table_name,
  COUNT(*) as row_count
FROM users
UNION ALL
SELECT 
  'news' as table_name,
  COUNT(*) as row_count
FROM news
UNION ALL
SELECT 
  'formations_advanced' as table_name,
  COUNT(*) as row_count
FROM formations_advanced;

-- 6. VÉRIFIER LES INDEXES
SELECT 
  tablename,
  indexname
FROM pg_indexes
WHERE tablename IN ('users', 'news', 'formations_advanced')
ORDER BY tablename, indexname;

-- 7. VÉRIFIER RLS (Row Level Security)
SELECT 
  tablename,
  CASE WHEN rowsecurity THEN '✅ RLS Activé' ELSE '❌ RLS Désactivé' END as rls_status
FROM pg_tables
WHERE tablename IN ('users', 'news', 'formations_advanced')
ORDER BY tablename;

-- 8. AFFICHER LES POLICIES RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('users', 'news', 'formations_advanced')
ORDER BY tablename, policyname;

-- RÉSULTAT ATTENDU:
-- ✅ Table 'users' - Existe avec colonnes: id, name, email, role, is_active, created_at, updated_at
-- ✅ Table 'news' - Existe avec colonnes: id, title, description, content, is_featured, is_published, author_id, created_at, updated_at
-- ✅ Table 'formations_advanced' - Existe avec colonnes: id, title, description, content, level, status, duration, author_id, created_at, updated_at
-- ✅ RLS activé sur toutes les tables
-- ✅ Policies configurés pour lecture publique + écriture authentifiée
