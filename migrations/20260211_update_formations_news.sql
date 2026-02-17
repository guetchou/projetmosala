-- Migration: Mettre à jour les tables formations_advanced et news
-- Date: 11 février 2026

-- Étape 1: Modifier formations_advanced
-- Supprimer la colonne level et ajouter image_url et published_date
ALTER TABLE formations_advanced 
DROP COLUMN IF EXISTS level CASCADE;

ALTER TABLE formations_advanced 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS published_date TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Étape 2: Modifier news pour ajouter image_url et link
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS image_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS link VARCHAR(500);

-- Créer les indexes si nécessaire
CREATE INDEX IF NOT EXISTS idx_formations_published_date ON formations_advanced(published_date);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news(created_at);

-- Vérification
SELECT 
  table_name,
  column_name,
  data_type
FROM 
  information_schema.columns
WHERE 
  table_name IN ('formations_advanced', 'news')
ORDER BY 
  table_name, ordinal_position;
