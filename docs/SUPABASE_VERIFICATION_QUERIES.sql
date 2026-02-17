#!/bin/bash
# Script de vérification post-configuration Supabase
# À exécuter dans Supabase SQL Editor

# ============================================
# 1. VÉRIFIER LES TABLES
# ============================================
echo "=== Vérification des tables ==="
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles';
-- Attendu: profiles

# ============================================
# 2. VÉRIFIER LES TRIGGERS
# ============================================
echo "=== Vérification des triggers ==="
SELECT trigger_name, event_object_schema, event_object_table 
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' AND trigger_name LIKE '%user%';
-- Attendu: on_auth_user_created

# ============================================
# 3. VÉRIFIER LES VUES
# ============================================
echo "=== Vérification des vues ==="
SELECT viewname FROM pg_views WHERE schemaname = 'public';
-- Attendu: superadmins, admin_content_users

# ============================================
# 4. VÉRIFIER LES FONCTIONS
# ============================================
echo "=== Vérification des fonctions ==="
SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public';
-- Attendu: handle_new_user, sync_existing_users

# ============================================
# 5. TESTER L'INSERTION MANUELLE
# ============================================
echo "=== Test d'insertion manuelle dans auth.users ==="
-- ATTENTION: Ce test crée un vrai utilisateur Supabase
-- À faire via l'interface Supabase Auth ou via API

# ============================================
# 6. VÉRIFIER LA TABLE PROFILES
# ============================================
echo "=== Vérification des données dans profiles ==="
SELECT COUNT(*) as total_profiles, COUNT(DISTINCT role) as role_count FROM public.profiles;
SELECT role, COUNT(*) as count FROM public.profiles GROUP BY role;

# ============================================
# 7. VÉRIFIER LES SUPERADMINS
# ============================================
echo "=== Voir tous les superadmins ==="
SELECT * FROM public.superadmins;

# ============================================
# 8. VÉRIFIER LES ADMIN_CONTENT
# ============================================
echo "=== Voir tous les admin_content ==="
SELECT * FROM public.admin_content_users;

# ============================================
# 9. VÉRIFIER LES MÉTADONNÉES SUPABASE
# ============================================
echo "=== Vérifier les métadonnées ==="
SELECT id, email, raw_user_meta_data FROM auth.users LIMIT 5;

# ============================================
# 10. TESTER RLS - SUPER ADMIN
# ============================================
echo "=== Tester RLS (vu par superadmin) ==="
-- Exécutez comme superadmin (via token JWT)
SELECT * FROM public.profiles;
-- Attendu: Tous les profils visibles

# ============================================
# 11. TESTER RLS - UTILISATEUR NORMAL
# ============================================
echo "=== Tester RLS (vu par utilisateur normal) ==="
-- Exécutez comme utilisateur normal (via token JWT)
SELECT * FROM public.profiles;
-- Attendu: Seulement son propre profil

# ============================================
# APRÈS TESTS - REQUÊTES UTILES
# ============================================

-- Mettre à jour un rôle:
UPDATE public.profiles SET role = 'superadmin' WHERE email = 'user@example.com';

-- Supprimer un utilisateur:
-- Via Auth Dashboard > Utilisateurs > Delete
-- Cela supprimera aussi son profil (CASCADE)

-- Synchroniser les utilisateurs existants:
SELECT * FROM public.sync_existing_users();

-- Voir les logs des triggers:
-- Supabase Dashboard > Database > Logs
