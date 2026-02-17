-- Migration Supabase - Schéma Mosala Admin System
-- Exécutez ce script dans la console SQL de Supabase

-- Créer le type enum pour les rôles
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'admin_content',
      'superadmin'
    );
  END IF;
END$$;

-- Table Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role user_role DEFAULT 'admin_content',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table News (Actualités)
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  link VARCHAR(500),
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  category VARCHAR(50) DEFAULT 'news',
  author_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Table Formations Advanced
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'formation_level') THEN
    CREATE TYPE formation_level AS ENUM (
      'beginner',
      'intermediate',
      'advanced'
    );
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'formation_status') THEN
    CREATE TYPE formation_status AS ENUM (
      'draft',
      'published',
      'archived'
    );
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS formations_advanced (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  level formation_level DEFAULT 'beginner',
  status formation_status DEFAULT 'draft',
  duration INTEGER DEFAULT 12,
  max_participants INTEGER DEFAULT 50,
  current_participants INTEGER DEFAULT 0,
  price DECIMAL(10, 2),
  prerequisites VARCHAR(500) DEFAULT '',
  author_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Créer les index pour améliorer les performances
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_news_published ON news(is_published);
CREATE INDEX idx_news_author ON news(author_id);
CREATE INDEX idx_formations_status ON formations_advanced(status);
CREATE INDEX idx_formations_level ON formations_advanced(level);
CREATE INDEX idx_formations_author ON formations_advanced(author_id);

-- Activer RLS (Row Level Security) pour plus de sécurité
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations_advanced ENABLE ROW LEVEL SECURITY;

-- Créer les politiques RLS

-- Politique pour les utilisateurs : chacun peut voir les utilisateurs actifs (non-email)
CREATE POLICY "Users can view active users" ON users
  FOR SELECT
  USING (is_active = true);

-- Autoriser les superadmins à gérer la table users (CRUD complet)
DROP POLICY IF EXISTS "Superadmin full access users" ON users;
CREATE POLICY "Superadmin full access users" ON users
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'superadmin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'superadmin');

-- Politique pour les actualités : tous peuvent voir les actualités publiées
CREATE POLICY "Users can view published news" ON news
  FOR SELECT
  USING (is_published = true);

-- Autoriser les superadmins à créer/modifier/supprimer des actualités
DROP POLICY IF EXISTS "Authenticated can insert news" ON news;
CREATE POLICY "Authenticated can insert news" ON news
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Superadmin can update news" ON news;
CREATE POLICY "Superadmin can update news" ON news
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'superadmin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'superadmin');

DROP POLICY IF EXISTS "Superadmin can delete news" ON news;
CREATE POLICY "Superadmin can delete news" ON news
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'superadmin');

-- Politique pour les formations : tous peuvent voir les formations publiées
CREATE POLICY "Users can view published formations" ON formations_advanced
  FOR SELECT
  USING (status = 'published');

-- Politique pour permettre l'insertion de formations par des utilisateurs authentifiés
DROP POLICY IF EXISTS "Authenticated can insert formations" ON formations_advanced;
CREATE POLICY "Authenticated can insert formations" ON formations_advanced
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Autoriser les superadmins à modifier/supprimer les formations
DROP POLICY IF EXISTS "Superadmin can update formations" ON formations_advanced;
CREATE POLICY "Superadmin can update formations" ON formations_advanced
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'superadmin')
  WITH CHECK ((auth.jwt() ->> 'role') = 'superadmin');

DROP POLICY IF EXISTS "Superadmin can delete formations" ON formations_advanced;
CREATE POLICY "Superadmin can delete formations" ON formations_advanced
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'role') = 'superadmin');

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON formations_advanced
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Données de test (optionnel - à commenter en production)
/*
-- Créer un superadmin de test
INSERT INTO users (name, email, password, role, is_active) VALUES
  ('Admin User', 'superadmin@mosala.com', '$2a$10$...', 'superadmin', true);

-- Créer un admin contenu de test
INSERT INTO users (name, email, password, role, is_active) VALUES
  ('Content Admin', 'admin@mosala.com', '$2a$10$...', 'admin_content', true);
*/
