-- ============================================
-- SUPABASE SETUP - SCRIPT RAPIDE
-- ============================================
-- Exécutez ce script dans Supabase SQL Editor
-- Dashboard > SQL Editor > Nouvelle requête > Coller ce contenu > Run
-- ============================================

-- 1. Créer la table profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Activer RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policies RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Superadmins view all" ON public.profiles FOR SELECT USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'superadmin');
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- 4. Fonction trigger
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'name', COALESCE(new.raw_user_meta_data->>'role', 'admin'))
  ON CONFLICT (id) DO UPDATE SET
    email = new.email,
    name = COALESCE(new.raw_user_meta_data->>'name', existing.name),
    role = COALESCE(new.raw_user_meta_data->>'role', existing.role),
    updated_at = CURRENT_TIMESTAMP;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Vues utiles
CREATE OR REPLACE VIEW public.superadmins AS SELECT p.id, p.email, p.name, p.created_at FROM public.profiles p WHERE p.role = 'superadmin';
CREATE OR REPLACE VIEW public.admin_content_users AS SELECT p.id, p.email, p.name, p.created_at FROM public.profiles p WHERE p.role = 'admin_content';

-- ✅ Configuration terminée!
