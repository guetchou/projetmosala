-- ============================================
-- SUPABASE: Synchronisation automatique des rôles
-- ============================================
-- 
-- Ce script crée une table profiles et un trigger pour
-- synchroniser automatiquement le rôle de auth.users vers public.profiles
--
-- Prérequis: Vous devez avoir une table 'profiles' dans votre schéma public
-- Si vous ne l'avez pas, le CREATE TABLE ci-dessous la créera

-- ============================================
-- 1. Créer la table profiles (si elle n'existe pas)
-- ============================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activer RLS sur la table profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. Créer des stratégies RLS pour les profiles
-- ============================================

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Les superadmins peuvent voir tous les profiles
CREATE POLICY "Superadmins can view all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'superadmin'
  );

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 3. Créer la fonction de synchronisation
-- ============================================

-- Fonction qui crée ou met à jour le profil quand un utilisateur s'inscrit
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
      new.id,
      new.email,
      new.raw_user_meta_data->>'name',
      COALESCE(new.raw_user_meta_data->>'role', 'admin')
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      name = COALESCE(EXCLUDED.name, public.profiles.name),
      role = COALESCE(EXCLUDED.role, public.profiles.role),
      updated_at = CURRENT_TIMESTAMP;

    RETURN new;
  EXCEPTION WHEN OTHERS THEN
    -- Don't let profile sync failures block user creation in auth.users
    RAISE NOTICE 'handle_new_user: sync to public.profiles failed: %', SQLERRM;
    RETURN new;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 4. Créer le trigger sur auth.users
-- ============================================

-- Supprimer le trigger s'il existe déjà
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Créer le trigger qui se déclenche quand un nouvel utilisateur est créé
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 5. Fonction pour synchroniser les rôles existants
-- ============================================

-- Si vous avez déjà des utilisateurs dans Supabase, exécutez ceci:
-- SELECT public.sync_existing_users();

CREATE OR REPLACE FUNCTION public.sync_existing_users()
RETURNS TABLE(synced_count INT) AS $$
DECLARE
  count INT;
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  SELECT 
    u.id,
    u.email,
    u.raw_user_meta_data->>'name',
    COALESCE(u.raw_user_meta_data->>'role', 'admin')
  FROM auth.users u
  ON CONFLICT (id) DO UPDATE SET
    role = COALESCE(EXCLUDED.role, 'admin'),
    updated_at = CURRENT_TIMESTAMP;
  
  GET DIAGNOSTICS count = ROW_COUNT;
  RETURN QUERY SELECT count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. Vues utiles pour les requêtes
-- ============================================

-- Vue pour obtenir les utilisateurs superadmin
CREATE OR REPLACE VIEW public.superadmins AS
SELECT p.id, p.email, p.name, p.created_at
FROM public.profiles p
WHERE p.role = 'superadmin';

-- Vue pour obtenir les utilisateurs admin_content
CREATE OR REPLACE VIEW public.admin_content_users AS
SELECT p.id, p.email, p.name, p.created_at
FROM public.profiles p
WHERE p.role = 'admin_content';

-- ============================================
-- 7. Exemples de requêtes
-- ============================================

-- Vérifier tous les rôles
-- SELECT id, email, role FROM public.profiles;

-- Vérifier les superadmins
-- SELECT * FROM public.superadmins;

-- Mettre à jour le rôle d'un utilisateur
-- UPDATE public.profiles SET role = 'superadmin' WHERE email = 'user@example.com';

-- ============================================
-- 8. Script de nettoyage (si nécessaire)
-- ============================================

-- Si vous voulez supprimer tout et recommencer:
-- DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- DROP FUNCTION IF EXISTS public.handle_new_user();
-- DROP TABLE IF EXISTS public.profiles CASCADE;
