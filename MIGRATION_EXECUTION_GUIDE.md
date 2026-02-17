# Guide d'Exécution de la Migration Supabase

## 📋 Résumé des Changements

Cette migration met à jour les schémas des tables `formations_advanced` et `news` pour supporter les nouvelles fonctionnalités du tableau de bord administrateur.

### Changements - formations_advanced
- ❌ **Supprimé**: Colonne `level` (enum)
- ✅ **Ajouté**: Colonne `image_url` (VARCHAR 500)
- ✅ **Ajouté**: Colonne `published_date` (TIMESTAMP)

### Changements - news
- ✅ **Ajouté**: Colonne `image_url` (VARCHAR 500)
- ✅ **Ajouté**: Colonne `link` (VARCHAR 500)

## 🚀 Étapes d'Exécution

### 1. Accédez à Supabase Console
- Allez sur [Supabase Dashboard](https://app.supabase.com)
- Sélectionnez votre projet
- Naviguez vers **SQL Editor**

### 2. Créez une Nouvelle Requête
- Cliquez sur **+ New Query**
- Copiez le script SQL ci-dessous

### 3. Exécutez le Script

```sql
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
```

### 4. Vérifiez les Changements

Exécutez cette requête pour vérifier que les colonnes ont été ajoutées correctement:

```sql
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM 
  information_schema.columns
WHERE 
  table_name IN ('formations_advanced', 'news')
ORDER BY 
  table_name, ordinal_position;
```

### Résultat Attendu

**formations_advanced:**
- id (integer)
- title (text)
- description (text)
- content (text)
- author_id (integer)
- image_url (character varying) ✅ NEW
- published_date (timestamp with time zone) ✅ NEW
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

**news:**
- id (integer)
- title (text)
- description (text)
- content (text)
- author_id (integer)
- is_featured (boolean)
- is_published (boolean)
- image_url (character varying) ✅ NEW
- link (character varying) ✅ NEW
- created_at (timestamp with time zone)
- updated_at (timestamp with time zone)

## 📝 Notes Importantes

1. **Sauvegarde**: Votre base de données Supabase effectue automatiquement des sauvegardes
2. **RLS (Row Level Security)**: Les RLS existants continuent à fonctionner avec les nouvelles colonnes
3. **API REST**: Vous pouvez immédiatement utiliser les nouvelles colonnes via l'API Supabase REST

## ✅ Après la Migration

1. Le frontend reconnectera automatiquement les nouveaux champs
2. Les formulaires d'administration afficheront les champs image et date
3. Les cartes afficheront les images et dates

## 🆘 Dépannage

### Erreur: "Column already exists"
- C'est normal si vous exécutez le script plusieurs fois
- Le script utilise `IF NOT EXISTS` pour éviter les erreurs

### Erreur: "Cannot drop column level"
- Vérifiez que la colonne `level` existe vraiment
- Vous pouvez l'ignorer si elle n'existe pas

### Les changements ne s'affichent pas
- Actualisez la page du navigateur (Ctrl+F5 ou Cmd+Shift+R)
- Attendez quelques secondes pour la propagation du cache
