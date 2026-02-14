-- Vérification et création des tables Supabase pour Mosala Admin
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Vérifier les tables existantes
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. Vérifier la structure de la table formations_advanced si elle existe
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'formations_advanced' 
ORDER BY ordinal_position;

-- 3. Vérifier la structure de la table news si elle existe
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'news' 
ORDER BY ordinal_position;

-- 4. Vérifier la structure de la table users si elle existe
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
