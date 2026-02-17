#!/bin/bash

# Script de diagnostic - Vérifier la connexion Supabase
# Usage: bash supabase-diagnostic.sh

echo "🔍 DIAGNOSTIC SUPABASE"
echo "===================="
echo ""

# Vérifier les variables d'environnement
echo "📋 Variables d'environnement..."
if [ -f ".env" ]; then
  if grep -q "VITE_SUPABASE_URL" .env; then
    echo "✅ VITE_SUPABASE_URL défini"
  else
    echo "❌ VITE_SUPABASE_URL manquant"
  fi
  
  if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    echo "✅ VITE_SUPABASE_ANON_KEY défini"
  else
    echo "❌ VITE_SUPABASE_ANON_KEY manquant"
  fi
else
  echo "❌ Fichier .env manquant"
fi

echo ""
echo "🔐 Vérification des Permissions RLS..."
echo ""
echo "Pour tester la connexion Supabase et vérifier les RLS:"
echo ""
echo "1. Allez sur https://app.supabase.com"
echo "2. Naviguez vers SQL Editor"
echo "3. Exécutez ces requêtes:"
echo ""
echo "--- Query 1: Vérifier la table users ---"
cat << 'SQL'
SELECT 
  table_name,
  is_updatable
FROM 
  information_schema.tables
WHERE 
  table_schema = 'public' 
  AND table_name IN ('users', 'profiles', 'admins');
SQL
echo ""
echo "--- Query 2: Vérifier les colonnes de la table users ---"
cat << 'SQL'
SELECT 
  column_name,
  data_type,
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_schema = 'public'
  AND table_name = 'users'
ORDER BY ordinal_position;
SQL
echo ""
echo "--- Query 3: Vérifier les RLS sur la table users ---"
cat << 'SQL'
SELECT 
  tablename,
  policies
FROM 
  pg_tables
WHERE 
  schemaname = 'public' 
  AND tablename = 'users';
SQL
echo ""
echo "--- Query 4: Compter les admins ---"
cat << 'SQL'
SELECT 
  COUNT(*) as total_admins,
  COUNT(CASE WHEN is_active THEN 1 END) as active_admins
FROM users
WHERE role IN ('superadmin', 'admin', 'admin_content');
SQL
echo ""
echo "--- Query 5: Afficher tous les admins ---"
cat << 'SQL'
SELECT id, name, email, role, is_active, created_at
FROM users
WHERE role IN ('superadmin', 'admin', 'admin_content')
ORDER BY created_at DESC;
SQL
echo ""
echo "--- Query 6: Vérifier les colonnes is_active et role ---"
cat << 'SQL'
SELECT 
  EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='is_active') as has_is_active,
  EXISTS(SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') as has_role;
SQL
echo ""
